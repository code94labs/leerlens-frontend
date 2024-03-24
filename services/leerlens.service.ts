import { leerLensApi } from "../api/api";
import { getRequest } from "../api/requests";

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
