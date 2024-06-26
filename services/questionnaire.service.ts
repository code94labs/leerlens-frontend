import { leerLensApi } from "../api/api";
import { getRequest } from "../api/requests";
import { FormEvaluation } from "../utils/enum";

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

export const getStudentFormInfoByFormType = async (formType: FormEvaluation) => {
  try {
    const response = await getRequest(`${leerLensApi.studentFormInfo}/formType/${formType}`);

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

export const getAllPreInterventionQuestions = async () => {
  try {
    const response = await getRequest(leerLensApi.preIntervention);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch pre-intervention questions");
    }
  } catch (error) {
    console.error("Error fetching pre-intervention questions:", error);
    throw error;
  }
};

export const getAllPostInterventionQuestions = async () => {
  try {
    const response = await getRequest(leerLensApi.postIntervention);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch post-intervention questions");
    }
  } catch (error) {
    console.error("Error fetching post-intervention questions:", error);
    throw error;
  }
};

export const getAllEvaluationQuestions = async () => {
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

export const getAllNormGroupQuestions = async () => {
  try {
    const response = await getRequest(leerLensApi.normgroup);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch normgroup questions");
    }
  } catch (error) {
    console.error("Error fetching normgroup questions:", error);
    throw error;
  }
};
