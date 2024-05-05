import { leerLensApi } from "../api/api";
import {
  getRequest,
  patchRequest,
  postRequest,
  updateRequest,
} from "../api/requests";
import { FormQuestion } from "../utils/types";

export const getEvaluationQuestions = async () => {
  try {
    const response = await getRequest(leerLensApi.evaluation);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch evaluation questions");
    }
  } catch (error) {
    console.error("Error fetching evaluation questions:", error);
    throw error;
  }
};

export const postEvaluationQuestions = async (
  newQuestion: FormQuestion
) => {
  try {
    const response = await postRequest(
      leerLensApi.evaluation,
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

export const evaluationQuestionUpdateById = async (updateQuestion: {
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
      `${leerLensApi.evaluation}/${updateQuestion.id}`,
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

export const evaluationQuesionsUpdateBulk = async (
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
      leerLensApi.evaluation,
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

export const evaluationQuestionFormSoftDelete = async (id: number) => {
  try {
    const response = await patchRequest(
      `${leerLensApi.evaluationSoftDelete}/${id}`,
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
