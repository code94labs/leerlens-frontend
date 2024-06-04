import axios from "axios";

export const postRequest = (api: string, body: object) =>
  axios
    .post(api, body)
    .then((response) => response)
    .catch((error) => error);

export const getRequest = (api: string, params?: object) =>
  axios
    .get(api, { params: params })
    .then((response) => response)
    .catch((error) => error);

export const updateRequest = (api: string, body: object) =>
  axios
    .put(api, body)
    .then((response) => response)
    .catch((error) => error);

export const deleteRequest = (api: string) =>
  axios
    .delete(api)
    .then((response) => response)
    .catch((error) => error);

export const patchRequest = (api: string, body: object) =>
  axios
    .patch(api, body)
    .then((response) => response)
    .catch((error) => error);
