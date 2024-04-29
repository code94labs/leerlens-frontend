import { leerLensApi } from "../api/api";
import {
  getRequest,
  patchRequest,
  postRequest,
  updateRequest,
} from "../api/requests";
import { FormQuestion } from "../utils/types";

export const getPostInterventionQuestions = async () => {
  try {
    const response = await getRequest(leerLensApi.postIntervention);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch post intervention questions");
    }
  } catch (error) {
    console.error("Error fetching post intervention questions:", error);
    throw error;
  }
};

export const postPostInterventionQuestions = async (
  newQuestion: FormQuestion
) => {
  try {
    const response = await postRequest(
      leerLensApi.postIntervention,
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

export const postInterventionQuestionUpdateById = async (updateQuestion: {
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
      `${leerLensApi.postIntervention}/${updateQuestion.id}`,
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

export const postInterventionQuesionsUpdateBulk = async (
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
      leerLensApi.postIntervention,
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

export const postInterventionQuestionFormSoftDelete = async (id: number) => {
  try {
    const response = await patchRequest(
      `${leerLensApi.postInterventionSoftDelete}/${id}`,
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
