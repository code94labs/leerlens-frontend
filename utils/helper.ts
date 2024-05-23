import { FieldType, SectionType } from "./enum";
import {
  DropDownOptions,
  PersonalDetails,
  Question,
  QuestionResponse,
  StudentDetailsAnswer,
} from "./types";

const getDropDownItem = (
  stdInfo: Question,
  dropdownItem: string
): DropDownOptions => {
  return stdInfo.dropdownOptions.find(
    (option) => option.item === dropdownItem
  )!;
};

const indexNotFound = -1;

export const generateStudentDetails = (
  formDetailValues: PersonalDetails,
  studentFormInfo: QuestionResponse[]
): any[] => {
  const results: any[] = [];

  for (const key in formDetailValues) {
    if (Object.prototype.hasOwnProperty.call(formDetailValues, key)) {
      const questionId = parseInt(key);
      const formValue = formDetailValues[key];

      console.log("questionId", questionId);
      console.log("formVlaue", formValue);

      studentFormInfo.forEach((question) => {
        if (
          question.id === questionId &&
          question.fieldType === FieldType.DropDown
        ) {
          const dropdownItem: DropDownOptions | undefined = getDropDownItem(
            question,
            formValue
          );

          if (dropdownItem) {
            const fieldType = question.fieldType;

            const result = {
              questionId,
              answer: dropdownItem.id,
              fieldType,
            };

            results.push(result);
          }
        } else if (question.id === questionId) {
          const fieldType = question.fieldType;

          const result = {
            questionId,
            answer: formValue,
            fieldType,
          };

          results.push(result);
        }
      });
    }
  }

  return results;
};

export const formatTimeStamp = (timestamp: string): string => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");

  const day = String(date.getDate()).padStart(2, "0");

  return `${year}/${month}/${day}`;
};

export const getDateRange = (dateRangeStr: string) => {
  return dateRangeStr.split(" - ");
};

export const formContentFiltering = (
  item: StudentDetailsAnswer,
  activeStep: number
) => {
  if (activeStep === 0 && item.sectionType === SectionType.PersonalDetails) {
    return true;
  } else if (
    activeStep === 3 &&
    item.sectionType === SectionType.ProgramAndSupervisor
  ) {
    return true;
  } else if (activeStep === 4 && item.sectionType === SectionType.Final) {
    return true;
  }

  return false;
};

export const generateEmptyLabels = (count: number): string[] => {
  return Array.from({ length: count }, () => "");
};

// function to update the array by the index
export const updateArrayByIndex = (arrayToUpdate: any[], question: any) => {
  const index = arrayToUpdate.findIndex((item) => item.id === question.id);

  if (index !== indexNotFound) {
    arrayToUpdate[index] = question;
  }

  return arrayToUpdate;
};

// move item up the array
export const moveItemUpInArray = (newQuestionArr: any[], orderId: number) => {
  newQuestionArr[orderId - 1].positionOrderId = orderId - 1;
  newQuestionArr[orderId - 2].positionOrderId = orderId;

  return newQuestionArr;
};

// move item down the array
export const moveItemDownInArray = (newQuestionArr: any[], orderId: number) => {
  newQuestionArr[orderId - 1].positionOrderId = orderId + 1;
  newQuestionArr[orderId].positionOrderId = orderId;

  return newQuestionArr;
};