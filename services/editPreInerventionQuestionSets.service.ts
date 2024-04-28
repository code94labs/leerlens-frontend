import { leerLensApi } from "../api/api";
import {
  getRequest,
  patchRequest,
  postRequest,
  updateRequest,
} from "../api/requests";
import { FieldType, FormEvaluation, SectionType } from "../utils/enum";
import {
  DropDownOptions,
  FormQuestion,
  Question,
  QuestionResponse,
} from "../utils/types";

export const getPreInterventionQuestions = async () => {
  try {
    const response = await getRequest(leerLensApi.preIntervention);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch pre intervention questions");
    }
  } catch (error) {
    console.error("Error fetching pre intervention questions:", error);
    throw error;
  }
};

export const postPreInterventionQuestions = async (
  newQuestion: FormQuestion
) => {
  try {
    const response = await postRequest(
      leerLensApi.preIntervention,
      newQuestion
    );

    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error("Failed to add question");
    }
  } catch (error) {
    console.log("Error adding question:", error);
    throw error;
  }
};

export const preInterventionQuestionUpdateById = async (updateQuestion: {
  id: number;
  questionText: string;
  positionOrderId: number;
  minValue: number;
  maxValue: number;
  questionSetId: number;
  questionSection: number;
}) => {
  try {
    const response = await patchRequest(
      `${leerLensApi.preIntervention}/${updateQuestion.id}`,
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

export const preInterventionQuesionsUpdateBulk = async (
  updateQuestions: {
    id?: number;
    questionText: string;
    positionOrderId: number;
    minValue: number;
    maxValue: number;
    questionSetId: number;
    questionSection: number;
  }[]
) => {
  try {
    const response = await patchRequest(
      leerLensApi.preIntervention,
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

export const preInterventionQuestionFormSoftDelete = async (id: number) => {
  try {
    const response = await patchRequest(
      `${leerLensApi.preInterventionSoftDelete}/${id}`,
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
