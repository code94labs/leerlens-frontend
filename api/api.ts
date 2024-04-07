export const baseUrl = "http://localhost:5000";

export const leerLensApi = {
  studentFormInfo: `${baseUrl}/studentFormInfo`,
  preIntervention: `${baseUrl}/questionnaire/pre-intervention`,
  postIntervention: `${baseUrl}/questionnaire/post-intervention`,
  evaluation: `${baseUrl}/questionnaire/evaluation`,
  normgroup: `${baseUrl}/questionnaire/normgroup`,

  login: `${baseUrl}/auth/login`,
  forgotPassword: `${baseUrl}/auth/forgot-password`,
};
