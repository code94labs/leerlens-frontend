import { leerLensApi } from "../api/api";
import { postRequest } from "../api/requests";

export const postLogin = async (loginInfo: {
  email: string;
  password: string;
}) => {
  try {
    const response = await postRequest(leerLensApi.login, loginInfo);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to login admin");
    }
  } catch (error) {
    console.error("Error login admin:", error);
    throw error;
  }
};

// export const getAllPreInterventionQuestions = async () => {
//   try {
//     const response = await getRequest(leerLensApi.preIntervention);

//     if (response.status === 200) {
//       return response.data;
//     } else {
//       throw new Error("Failed to fetch pre-intervention questions");
//     }
//   } catch (error) {
//     console.error("Error fetching pre-intervention questions:", error);
//     throw error;
//   }
// };

// export const getAllPostInterventionQuestions = async () => {
//   try {
//     const response = await getRequest(leerLensApi.postIntervention);

//     if (response.status === 200) {
//       return response.data;
//     } else {
//       throw new Error("Failed to fetch post-intervention questions");
//     }
//   } catch (error) {
//     console.error("Error fetching post-intervention questions:", error);
//     throw error;
//   }
// };

// export const getAllEvaluationQuestions = async () => {
//   try {
//     const response = await getRequest(leerLensApi.evaluation);

//     if (response.status === 200) {
//       return response.data;
//     } else {
//       throw new Error("Failed to fetch evaluation questions");
//     }
//   } catch (error) {
//     console.error("Error fetching evaluation questions:", error);
//     throw error;
//   }
// };

// export const getAllNormGroupQuestions = async () => {
//   try {
//     const response = await getRequest(leerLensApi.normgroup);

//     if (response.status === 200) {
//       return response.data;
//     } else {
//       throw new Error("Failed to fetch normgroup questions");
//     }
//   } catch (error) {
//     console.error("Error fetching normgroup questions:", error);
//     throw error;
//   }
// };
