import { leerLensApi } from "../api/api";
import {
  getRequest,
  patchRequest,
  postRequest,
  updateRequest,
} from "../api/requests";
import { FormQuestion } from "../utils/types";

export const getNormgroupQuestions = async () => {
  try {
    const response = await getRequest(leerLensApi.normgroup);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch norm group questions");
    }
  } catch (error) {
    console.error("Error fetching norm group questions:", error);
    throw error;
  }
};

export const postNormgroupQuestions = async (
  newQuestion: FormQuestion
) => {
  try {
    const response = await postRequest(
      leerLensApi.normgroup,
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

export const normgroupQuestionUpdateById = async (updateQuestion: {
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
      `${leerLensApi.normgroup}/${updateQuestion.id}`,
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

export const normgroupQuesionsUpdateBulk = async (
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
      leerLensApi.normgroup,
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

export const normgroupQuestionFormSoftDelete = async (id: number) => {
  try {
    const response = await patchRequest(
      `${leerLensApi.normgroupSoftDelete}/${id}`,
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
