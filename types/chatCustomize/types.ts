export interface IChatCusotmizeState { }

export interface IQuestionsState {
    questions: IQuestion[];
    integrateQA: IQuestion[];
    oldIntegrateOA: IQuestion[];
    departmentQA: { [key: string]: any };
    oldDepartmentQA: IQuestion[];
}

export interface IQuestion {
    id: number;
    queue_id: {
        Int64: number;
        Valid: boolean;
    };
    tenent_id: number;
    center_id: number;
    question_number: number;
    question: string;
    answer: string;
    createdDateTime: {
        Time: string;
        Valid: boolean;
    };
}

export interface IConditionsState {
    defaultCondition: { [key: string]: any };
    normalCondition: { [key: string]: any };
    specialCondition: { [key: string]: any };
    days: IDay[]
}
interface IDay {
    day: string,
    date?: string,
    from: string,
    to: string,
    status: boolean
}