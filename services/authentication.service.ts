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

export const postForgotPassword = async (forgotPasswordInfo: { email: string }) => {
  try {
    const response = await postRequest(leerLensApi.forgotPassword, forgotPasswordInfo);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Invalid email");
    }
  } catch (error) {
    console.error("Error:", error);
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
