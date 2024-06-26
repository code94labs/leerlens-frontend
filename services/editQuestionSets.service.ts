import { leerLensApi } from "../api/api";
import {
  getRequest,
  patchRequest,
  postRequest,
  updateRequest,
} from "../api/requests";
import { FieldType, FormEvaluation, SectionType } from "../utils/enum";
import { DropDownOptions, Question, QuestionResponse } from "../utils/types";

export const getStudentFormInfo = async () => {
  try {
    const response = await getRequest(leerLensApi.studentFormInfo);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch student info questions");
    }
  } catch (error) {
    console.error("Error fetching student info questions:", error);
    throw error;
  }
};

export const postStudentFormInfo = async (newQuestion: Question) => {
  try {
    const response = await postRequest(
      leerLensApi.studentFormInfo,
      newQuestion
    );

    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error("Failed to add question");
    }
  } catch (error) {
    console.error("Error adding question:", error);
    throw error;
  }
};

export const studentFormInfoItemUpdateById = async (updateQuestion: {
  id: number;
  formType: FormEvaluation;
  questionText: string;
  fieldType: FieldType;
  sectionType: SectionType;
  positionOrderId: number;
  dropdownOptions: DropDownOptions[];
  minValue: number;
  maxValue: number;
}) => {
  try {
    const response = await patchRequest(
      `${leerLensApi.studentFormInfo}/${updateQuestion.id}`,
      updateQuestion
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to update question");
    }
  } catch (error) {
    console.error("Error updating question:", error);
    throw error;
  }
};

export const studentFormInfoItemUpdateBulk = async (
  updateQuestions: {
    id: number;
    formType: FormEvaluation;
    questionText: string;
    fieldType: FieldType;
    sectionType: SectionType;
    positionOrderId: number;
    dropdownOptions: DropDownOptions[];
    minValue: number;
    maxValue: number;
  }[]
) => {
  try {
    const response = await patchRequest(
      leerLensApi.studentFormInfo,
      updateQuestions
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to update questions");
    }
  } catch (error) {
    console.error("Error updating questions:", error);
    throw error;
  }
};

export const studentFormInfoItemSoftDelete = async (id: number) => {
  try {
    const response = await patchRequest(
      `${leerLensApi.studentFormInfoItemSoftDelete}/${id}`,
      { isDelete: true }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to soft delete question");
    }
  } catch (error) {
    console.error("Error soft deleting question:", error);
    throw error;
  }
};
