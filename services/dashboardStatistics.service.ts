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
