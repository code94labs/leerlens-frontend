import { leerLensApi } from "../api/api";
import { getRequest } from "../api/requests";
import { GetStatisticsQueryParams } from "../utils/types";

export const getPrePostStatistics = async (
  params: GetStatisticsQueryParams
) => {
  try {
    const response = await getRequest(leerLensApi.prePostStatistics, params);

    return response.data;
  } catch (error) {
    console.error("Error fetching Pre Post Interventions statistics", error);

    throw error;
  }
};

export const getNormgroupStatistics = async (
  params: GetStatisticsQueryParams
) => {
  try {
    const response = await getRequest(leerLensApi.normGroupStatistics, params);

    return response.data;
  } catch (error) {
    console.error("Error fetching normgroup statistics", error);

    throw error;
  }
};

export const getPrePostSummaryStatistics = async (
  params: GetStatisticsQueryParams
) => {
  try {
    const response = await getRequest(
      leerLensApi.prePostSummaryStatistics,
      params
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching Pre Post Interventions summary statistics",
      error
    );

    throw error;
  }
};

export const getNormgroupSummaryStatistics = async (
  params: GetStatisticsQueryParams
) => {
  try {
    const response = await getRequest(
      leerLensApi.normGroupSummaryStatistics,
      params
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching normgroup summary statistics", error);

    throw error;
  }
};

export const getNormgroupCompareSummaryStatistics = async (params: {
  groupOneFilters: GetStatisticsQueryParams;
  groupTwoFilters: GetStatisticsQueryParams;
}) => {
  try {
    const response = await getRequest(
      leerLensApi.normGroupCompareSummaryStatistics,
      params
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching normgroup compare summary statistics", error);

    throw error;
  }
};

export const getPrePostAbsoluteStat = async (
  params: GetStatisticsQueryParams
) => {
  try {
    const response = await getRequest(leerLensApi.prePostAbsoluteStat, params);

    // console.log("response", response);

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching Pre Post Interventions absolute statistics",
      error
    );

    throw error;
  }
};

export const getNormgroupAbsoluteStat = async (
  params: GetStatisticsQueryParams
) => {
  try {
    const response = await getRequest(
      leerLensApi.normGroupAbsoluteStat,
      params
    );

    // console.log("response", response);

    return response.data;
  } catch (error) {
    console.error("Error fetching normgroup absolute statistics", error);

    throw error;
  }
};

export const getPrePostRelativeStat = async (
  params: GetStatisticsQueryParams
) => {
  try {
    const response = await getRequest(leerLensApi.prePostRelativeStat, params);

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching Pre Post Interventions relative statistics",
      error
    );

    throw error;
  }
};

export const getNormgroupRelativeStat = async (
  params: GetStatisticsQueryParams
) => {
  try {
    const response = await getRequest(
      leerLensApi.normGroupRelativeStat,
      params
    );

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
