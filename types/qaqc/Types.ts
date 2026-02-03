import { useContactFormStore } from "@/stores/contact/form";

export const QaQcFormDataModel = (data: any) => {
  let list: any = [];
  let id = 1;
  if (data) {
    const excludedSectionNames = [
      "explanation",
      "call_details",
      "first_review",
      "reviewee_opinion",
      "manager_opinion",
      "second_review",
    ];

    const result = data.sections.filter(
      (item: any) => !excludedSectionNames.includes(item.name)
    );
    result.forEach((elem: any) => {
      let fields: any = [];
      let scores: any = [];
      let descriptions: any = [];
      let multiplier = 0;
      const elemLen = elem.fields.length - 1;
      elem.fields.forEach((field: any) => {
        const lastField = elem.fields[elemLen].title;
        const fieldObj = {
          title: field.title,
          hasBorderBottom: lastField == field.title ? false : true,
          height: "100px",
          name: field.name,
          score: 0,
          description: "",
          tooltip: field.additional_info?.tooltip,
        };
        const scoreObj = {
          title: 0,
          total: 0,
          width: "10%",
          hasBorderBottom: lastField == field.title ? false : true,
          height: "50px",
          name: field.name,
        };
        const descriptionObj = {
          title: "",
          width: "10%",
          hasBorderBottom: lastField == field.title ? false : true,
          height: "50px",
          name: field.name,
        };
        multiplier = field.additional_info?.multiplier;
        fields.push(fieldObj);
        scores.push(scoreObj);
        descriptions.push(descriptionObj);
      });
      const obj = {
        isOpen: true,
        id: {
          value: id++,
          width: "5%",
        },
        title: {
          value: elem.title,
          width: "15%",
        },
        types: {
          value: fields,
          width: "30%",
        },
        scoreCoefficient: {
          value: multiplier,
          width: "10%",
        },
        score: {
          value: scores,
          width: "10%",
        },
        description: {
          value: descriptions,
          width: "20%",
        },
      };
      list.push(obj);
    });
  }
  return list;
};

export const generateDataModelForSubmitedForm = (data: any) => {
  let list: any = [];
  let id = 1;
  if (data) {
    const excludedSectionNames = [
      "explanation",
      "call_details",
      "first_review",
      "reviewee_opinion",
      "manager_opinion",
      "second_review",
    ];

    const result = data.sections.filter(
      (item: any) => !excludedSectionNames.includes(item.name)
    );
    result.forEach((elem: any) => {
      let fields: any = [];
      let scores: any = [];
      let descriptions: any = [];
      let multiplier = 0;

      const elemLen = elem.fields.length - 1;
      elem.fields.forEach((field: any) => {
        const lastField = elem.fields[elemLen].title;
        const scoreObj = {
          title: 0,
          total: 0,
          width: "10%",
          hasBorderBottom: lastField == field.title ? false : true,
          height: "50px",
          name: field.name,
        };
        const descriptionObj = {
          title: "",
          width: "10%",
          hasBorderBottom: lastField == field.title ? false : true,
          height: "50px",
          name: field.name,
        };
        const fieldObj = {
          title: field.title,
          hasBorderBottom: lastField == field.title ? false : true,
          height: "100px",
          name: field.name,
          score: "",
          description: "",
        };
        scores.push(scoreObj);
        descriptions.push(descriptionObj);
        multiplier = field.additional_info.multiplier;
        fields.push(fieldObj);
      });

      const obj = {
        isOpen: true,
        id: {
          value: id++,
          width: "5%",
        },
        title: {
          value: elem.title,
          width: "15%",
        },
        types: {
          value: fields,
          width: "30%",
        },
        scoreCoefficient: {
          value: multiplier,
          width: "10%",
        },
        score: {
          value: scores,
          width: "10%",
        },
        description: {
          value: descriptions,
          width: "20%",
        },
      };
      list.push(obj);
    });
  }

  return list;
};

export const generateDataModelForExpretSubmit = (
  type: string,
  form: any,
  call_id: string,
  ulid: string,
  operator_number: string,
  first_review_reviewer_name: string,
  first_review_reviewer_phone: string,
  first_review_timestamp: number,
  first_review_time_spent: number,
  first_review_desc: string,
  manager_phone: string,
  manager_name: string,
  manager_opinion_timestamp: number,
  manager_opinion_score: number,
  manager_opinion_desc: string
) => {
  const contactFormStore = useContactFormStore();
  const detectCustomForm = contactFormStore.formsList.find((item) => {
    return item.type == "custom";
  });

  let list: any = [];
  let result: any = [];
  form.forEach((elem: any) => {
    elem.types.value.forEach((item: any) => {
      const obj = {
        name: item.name,
        score: item.score * elem.scoreCoefficient.value,
        description: item.description,
        scoreCoefficient: elem.scoreCoefficient.value,
      };
      list.push(obj);
    });
  });

  form.forEach((elem: any) => {
    elem.score.value.forEach((item: any) => {
      list.forEach((index: any) => {
        if (index.name == item.name) {
          const obj = {
            name: item.name,
            description: index.description,
            score: 5 * item.title,
          };
          result.push(obj);
        }
      });
    });
  });

  let values = {};
  list.forEach((elem: any) => {
    values[elem.name] = JSON.stringify({
      score: elem.score,
      description: elem.description,
    });
  });
  if (type == "submit") {
    return {
      form_type: detectCustomForm ? "custom" : "call_qa",
      values: {
        ...values,
        call_id: call_id.toString(),
        operator_number,
        first_review_reviewer_name: first_review_reviewer_name.toString(),
        first_review_reviewer_phone: first_review_reviewer_phone.toString(),
        first_review_timestamp,
        first_review_time_spent,
        first_review_desc,
      },
    };
  } else {
    return {
      service_type: "qaqc",
      ulid: ulid,
      values: {
        ...values,
        call_id: call_id.toString(),
        operator_number,
        first_review_reviewer_name: first_review_reviewer_name.toString(),
        first_review_reviewer_phone: first_review_reviewer_phone.toString(),
        first_review_timestamp,
        first_review_time_spent,
        first_review_desc,
        manager_phone: manager_phone.toString(),
        manager_name: manager_name.toString(),
        manager_opinion_timestamp,
        manager_opinion_score,
        manager_opinion_desc,
      },
    };
  }
};

export const setByQuestions = (data: any, form: any) => {
  let parsedList: any = [];
  for (const key in data) {
    if (key.startsWith("q")) {
      const obj = {
        name: key,
        score: JSON.parse(data[key].value).score,
        description: JSON.parse(data[key].value).description,
      };
      parsedList.push(obj);
    }
  }

  let values = {};
  parsedList.forEach((elem: any) => {
    values[elem.name] = {
      score: elem.score,
      description: elem.description,
    };
  });

  form.forEach((elem: any) => {
    elem.description.value.forEach((item: any) => {
      const data = item;
      data.title = values[item.name].description;
    });
  });

  form.forEach((elem: any) => {
    elem.score.value.forEach((item: any) => {
      const data = item;
      data.title = values[item.name].score / 5;
    });
  });

  form.forEach((elem: any) => {
    elem.types.value.forEach((item: any) => {
      const data = item;
      data.score = values[item.name].score / elem.scoreCoefficient.value;
    });
  });

  form.forEach((elem: any) => {
    elem.types.value.forEach((item: any) => {
      const data = item;
      data.description = values[item.name].description;
    });
  });
};

export const HandleDataModelEvolationReport = (data: any) => {
  const result: any = [];
  let id: any = 1;
  data.forEach((element: any) => {
    result.push({
      row: id++,
      operator_number: element.fields.operator_number.value,
      reviewer: element.fields.reviewer.value,
      avg: element.avg,
    });
  });
  return result;
};
