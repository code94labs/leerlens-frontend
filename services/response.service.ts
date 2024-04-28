import { leerLensApi } from "../api/api";
import { deleteRequest, getRequest, postRequest } from "../api/requests";
import { CreateStudentResponse } from "../utils/types";

export const createStudentResponse = async (reqBody: CreateStudentResponse) => {
  try {
    const response = await postRequest(leerLensApi.response, reqBody);

    return response.data;
  } catch (error) {
    console.error("Error creating student response submission:", error);

    throw error;
  }
};

export const getAllStudentResponses = async () => {
  try {
    const response = await getRequest(leerLensApi.response);

    return response.data;
  } catch (error) {
    console.error("Error fetching student info questions:", error);

    throw error;
  }
};

export const deleteStudentResponseById = async (id: number) => {
  try {
    await deleteRequest(`${leerLensApi.response}/${id}`);

  } catch (error) {
    console.error("Error fetching student info questions:", error);

    throw error;
  }
};
