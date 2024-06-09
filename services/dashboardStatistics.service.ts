import { leerLensApi } from "../api/api";
import { getRequest } from "../api/requests";

export const getPrePostStatistics = async () => {
  try {
    const response = await getRequest(leerLensApi.prePostStatistics);

    return response.data;
  } catch (error) {
    console.error("Error fetching Pre Post Interventions statistics", error);

    throw error;
  }
};

export const getPrePostSummaryStatistics = async () => {
  try {
    const response = await getRequest(leerLensApi.prePostSummaryStatistics);

    return response.data;
  } catch (error) {
    console.error("Error fetching Pre Post Interventions summary statistics", error);

    throw error;
  }
};

export const getPrePostAbsoluteStat = async () => {
  try {
    const response = await getRequest(leerLensApi.prePostAbsoluteStat);

    console.log("response", response);

    return response.data;
  } catch (error) {
    console.error("Error fetching Pre Post Interventions absolute statistics", error);

    throw error;
  }
};

export const getPrePostRelativeStat = async () => {
  try {
    const response = await getRequest(leerLensApi.prePostRelativeStat);

    return response.data;
  } catch (error) {
    console.error("Error fetching Pre Post Interventions relative statistics", error);

    throw error;
  }
};

export const getNormGroupStatistics = async () => {
  try {
    const response = await getRequest(leerLensApi.normGroupStatistics);

    return response.data;
  } catch (error) {
    console.error("Error fetching Norm group statistics", error);

    throw error;
  }
};

export const getEvaluationStatistics = async () => {
  try {
    const response = await getRequest(leerLensApi.evaluationStatistics);

    return response.data;
  } catch (error) {
    console.error("Error fetching evaluation statistics", error);

    throw error;
  }
};
