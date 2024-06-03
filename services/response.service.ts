import { leerLensApi } from "../api/api";
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
  updateRequest,
} from "../api/requests";
import {
  BulkUpdateClassName,
  BulkUpdateCourse,
  CreateStudentResponse,
  GetResponsesQueryParams,
  UpdateStudentResponse,
} from "../utils/types";

export const createStudentResponse = async (reqBody: CreateStudentResponse) => {
  try {
    const response = await postRequest(leerLensApi.response, reqBody);

    return response.data;
  } catch (error) {
    console.error("Error creating student response submission:", error);

    throw error;
  }
};

export const getAllStudentResponses = async (
  params: GetResponsesQueryParams
) => {
  try {
    const response = await getRequest(leerLensApi.response, params);

    return response.data;
  } catch (error) {
    console.error("Error fetching student info questions:", error);

    throw error;
  }
};

export const updateStudentResponse = async (
  id: number,
  reqBody: UpdateStudentResponse
) => {
  try {
    const response = await updateRequest(
      `${leerLensApi.response}/${id}`,
      reqBody
    );

    return response.data;
  } catch (error) {
    console.error("Error creating student response submission:", error);

    throw error;
  }
};

export const bulkUpdateClassName = async (reqBody: BulkUpdateClassName) => {
  try {
    const response = await patchRequest(
      `${leerLensApi.responseBulkClass}`,
      reqBody
    );

    return response.data;
  } catch (error) {
    console.error("Error caused during class name bulk update request:", error);

    throw error;
  }
};

export const bulkUpdateCourse = async (reqBody: BulkUpdateCourse) => {
  try {
    const response = await patchRequest(
      `${leerLensApi.responseBulkCourse}`,
      reqBody
    );

    return response.data;
  } catch (error) {
    console.error("Error caused during course bulk update request:", error);

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
