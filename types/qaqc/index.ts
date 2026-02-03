export type TQaQcItem = {
    call_type: {
        value: string;
        color: string;
    };
    caller: string;
    caller_number: string;
    cost: string;
    dateTime: string;
    destination: string;
    didNumber: string;
    duration: number;
    en_call_type: string;
    hasAction: boolean;
    hasEvaluation: boolean;
    id: string;
    idView: string;
    index: number;
    loading: boolean;
    oprator_number_qaqc: string;
    playState: boolean;
    queue: string;
    queueID: string;
    rating: string;
    rec_path?: string;
    hasAdminComment: boolean;
    row: number;
    selected: false;
    setup_time: string;
    usge: string;
    x_cid: string;
};

// Flow:
// Class Evaluation:
//     - TDepartment -> TCriteriaSection -> TCriteria ---> client -> TCriteriaData ||| is for my forms from ci
//     - evaluationData -> TCriteriaData  ||| is for inputs which user can fill
//     - evaluatedData -> any ||| is the first evaluated data from server which i have to set it to current evaluationData

export type TDepartment = {
    id: string;
    name: string;
    service_type: string;
    type: string;
    criteriaSections: TCriteriaSection[];
};

export type TCriteriaSection = {
    name: string;
    title: string;
    multiplier: number;
    criterias: TCriteria[];
};

export type TCriteria = {
    name: string;
    description: string;
    tooltip: string;
};

export type TCriteriaData = {
    criteriaId: string;
    score: number | null;
    description: string;
};

export type TEvaluationData = {
    sectionId: string;
    sectionMultiplier: number;
    criterias: TCriteriaData[];
};

export interface IEvaluation {
    departmentList: TDepartment[]; // Data from API
    evaluationData: TEvaluationData[]; // Data from Client

    submited: boolean;
    evaluatedData: {
        ulid?: string;
        first_review_reviewer_name?: string;
        first_review_reviewer_phone?: string;
        first_review_time_spent?: number;
        first_review_timestamp?: number;
        first_review_comment?: string;

        manager_opinion_score?: number;
        [key: string]: any;
    };

    addDepartment(department: TDepartment): void;
    addEvaluationData(evaluationData: TEvaluationData): void;
    addEvaluatedData(evaluatedData: { [key: string]: any }): void;
    setSubmitedToTrue(): void;

    clearDepartmentList(): void;
    clearEvaluationData(): void;
    clearEvaluatedData(): void;
    clearSubmited(): void;

    mapApiData(data: TQaqcDataApi[]): void;
    mapFormToEvaluationInputs(selectedDepartment: TDepartment | null): void;

    isSubmitable(): boolean;
    getReadyToSubmitData(): Record<string, string>;
}

export class Evaluation implements IEvaluation {
    departmentList: TDepartment[] = [];
    evaluationData: TEvaluationData[] = [];

    submited: boolean = false;
    evaluatedData: { [key: string]: any } = {};

    constructor() {}

    // Setters
    addDepartment(department: TDepartment) {
        this.departmentList.push(department);
    }
    addEvaluationData(evaluationData: TEvaluationData) {
        this.evaluationData.push(evaluationData);
    }
    addEvaluatedData(evaluatedData: { [key: string]: any }) {
        this.evaluatedData = { ...this.evaluatedData, ...evaluatedData };
    }
    setSubmitedToTrue() {
        this.submited = true;
    }

    // Clear all data
    clearDepartmentList() {
        this.departmentList = [];
    }
    clearEvaluationData() {
        this.evaluationData = [];
    }
    clearEvaluatedData() {
        this.evaluatedData = {};
    }
    clearSubmited() {
        this.submited = false;
    }

    mapApiData(data: TQaqcDataApi[]) {
        // clear all data for next modal open
        this.clearDepartmentList();

        // 1: fill department list
        data.forEach((form) => {
            if (form.service_type === 'qaqc')
                this.addDepartment({
                    id: form.ulid,
                    name: form.title,
                    service_type: form.service_type,
                    type: form.type,
                    criteriaSections: [],
                });
        });

        // 2: fill criteria section list
        data.forEach((form) => {
            if (form.service_type === 'qaqc') {
                // find department by ulid
                const department = this.departmentList.find(
                    (department) => department.id === form.ulid
                );

                // continue if department is in the list
                if (!department) return;

                // fill criteria section list
                form.sections.forEach((section) => {
                    let isItQaqc = false;
                    let multiplier = 0;
                    section.fields.forEach((field) => {
                        if (/^q\d*$/.test(field.name)) {
                            isItQaqc = true;
                            multiplier = field.additional_info.multiplier;
                        }
                    });

                    // continue if section has qaqc criteria with name like q1, q2, q3, etc.
                    if (isItQaqc)
                        department.criteriaSections.push({
                            name: section.name,
                            title: section.title,
                            multiplier,
                            criterias: [],
                        });
                });
            }
        });

        // 3: fill each section items
        data.forEach((form) => {
            if (form.service_type === 'qaqc') {
                // find department by ulid
                const department = this.departmentList.find(
                    (department) => department.id === form.ulid
                );

                // continue if department is in the list
                if (!department) return;

                form.sections.forEach((section) => {
                    // find criteria section by name
                    const criteriaSection = department.criteriaSections.find(
                        (criteriasection) =>
                            criteriasection.name === section.name
                    );

                    // continue if criteria section is in the list
                    if (!criteriaSection) return;

                    section.fields.forEach((field) => {
                        if (/^q\d*$/.test(field.name)) {
                            criteriaSection.criterias.push({
                                name: field.name,
                                description: field.title,
                                tooltip: field.additional_info.tooltip,
                            });
                        }
                    });
                });
            }
        });

        // 4: map form to evaluation inputs
        this.mapFormToEvaluationInputs(this.departmentList[0]);
    }

    mapFormToEvaluationInputs(selectedDepartment: TDepartment | null) {
        if (!selectedDepartment) return;

        this.clearEvaluationData();

        // fill criteria group list and init Evaluation Data
        selectedDepartment.criteriaSections.forEach((criteriaSection) => {
            this.addEvaluationData({
                sectionId: criteriaSection.name,
                sectionMultiplier: criteriaSection.multiplier,
                criterias: criteriaSection.criterias.map((criteria) => ({
                    criteriaId: criteria.name,
                    score:
                        this.extractScoreAndDescriptionFromDataString(
                            this.evaluatedData[criteria.name],
                            criteriaSection.multiplier
                        )?.score || null,
                    description:
                        this.extractScoreAndDescriptionFromDataString(
                            this.evaluatedData[criteria.name],
                            criteriaSection.multiplier
                        )?.description || '',
                })),
            });
        });
    }

    extractScoreAndDescriptionFromDataString(
        str: any,
        criteriaMultiplier: number
    ) {
        // input data is: {\"score\":5,\"description\":\"\"}
        //                {\"score\":2,\"description\":\"asdf\"}
        if (typeof str === 'string') {
            if (str.includes('score')) {
                const score = parseInt(
                    str.split('score')[1]?.split(',')[0]?.split(':')[1]
                );
                const description = str.split('description')[1]?.split('"')[2];
                return { score, description };
            }
        }
    }

    isSubmitable() {
        return this.evaluationData.some((criteriaSection) =>
            criteriaSection.criterias.some(
                (criteria) => criteria.score !== null
            )
        );
    }

    getReadyToSubmitData() {
        const answers: Record<string, string> = {};

        this.evaluationData.forEach((criteriaSection) => {
            criteriaSection.criterias.forEach((criteria) => {
                answers[`${criteria.criteriaId}`] = `{\"score\":${
                    criteria.score ? criteria.score : 0
                },\"description\":\"${criteria.description}\"}`;
            });
        });
        return answers;
    }
}

type TQaqcDataApi = {
    title: string;
    service_type: string;
    type: string;
    ulid: string;
    sections: {
        fields: {
            additional_info: {
                multiplier: number;
                tooltip: string;
            };
            name: string;
            title: string;
        }[];
        name: string;
        title: string;
    }[];
};

export type TQaqcEvaluatedFormData = {
    form_type: string;
    values: {
        [key: string]: string;
    };
};
