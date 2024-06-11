import { leerLensApi } from "../api/api";
import { getRequest } from "../api/requests";
import { GetStatisticsQueryParams } from "../utils/types";

export const getPrePostStatistics = async () => {
  try {
    const response = await getRequest(leerLensApi.prePostStatistics);

    return response.data;
  } catch (error) {
    console.error("Error fetching Pre Post Interventions statistics", error);

    throw error;
  }
};

export const getNormgroupStatistics = async () => {
  try {
    const response = await getRequest(leerLensApi.normGroupStatistics);

    return response.data;
  } catch (error) {
    console.error("Error fetching normgroup statistics", error);

    throw error;
  }
};

export const getPrePostSummaryStatistics = async () => {
  try {
    const response = await getRequest(leerLensApi.prePostSummaryStatistics);

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching Pre Post Interventions summary statistics",
      error
    );

    throw error;
  }
};

export const getNormgroupSummaryStatistics = async () => {
  try {
    const response = await getRequest(leerLensApi.normGroupSummaryStatistics);

    return response.data;
  } catch (error) {
    console.error("Error fetching normgroup summary statistics", error);

    throw error;
  }
};

export const getPrePostAbsoluteStat = async () => {
  try {
    const response = await getRequest(leerLensApi.prePostAbsoluteStat);

    console.log("response", response);

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching Pre Post Interventions absolute statistics",
      error
    );

    throw error;
  }
};

export const getNormgroupAbsoluteStat = async () => {
  try {
    const response = await getRequest(leerLensApi.normGroupAbsoluteStat);

    console.log("response", response);

    return response.data;
  } catch (error) {
    console.error("Error fetching normgroup absolute statistics", error);

    throw error;
  }
};

export const getPrePostRelativeStat = async () => {
  try {
    const response = await getRequest(leerLensApi.prePostRelativeStat);

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching Pre Post Interventions relative statistics",
      error
    );

    throw error;
  }
};

export const getNormgroupRelativeStat = async () => {
  try {
    const response = await getRequest(leerLensApi.normGroupRelativeStat);

    return response.data;
  } catch (error) {
    console.error("Error fetching normgroup relative statistics", error);

    throw error;
  }
};

export const getEvaluationStatistics = async (
  params: GetStatisticsQueryParams
) => {
  try {
    const response = await getRequest(leerLensApi.evaluationStatistics, params);

    return response.data;
  } catch (error) {
    console.error("Error fetching evaluation statistics", error);

    throw error;
  }
};
