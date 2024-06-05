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
