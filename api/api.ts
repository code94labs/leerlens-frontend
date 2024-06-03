export const baseUrl = "http://localhost:5000";
// export const baseUrl = "http://leerlens-backend-nestjs-env-env.eba-4m4wcq8f.us-east-1.elasticbeanstalk.com"
// export const baseUrl = "https://leerlens.nl";

export const leerLensApi = {
  studentFormInfo: `${baseUrl}/studentFormInfo`,
  studentFormInfoItemSoftDelete: `${baseUrl}/studentFormInfo/soft-delete`,

  preIntervention: `${baseUrl}/questionnaire/pre-intervention`,
  preInterventionSoftDelete: `${baseUrl}/questionnaire/pre-intervention/soft-delete`,

  postIntervention: `${baseUrl}/questionnaire/post-intervention`,
  postInterventionSoftDelete: `${baseUrl}/questionnaire/post-intervention/soft-delete`,

  evaluation: `${baseUrl}/questionnaire/evaluation`,
  evaluationSoftDelete: `${baseUrl}/questionnaire/evaluation/soft-delete`,

  normgroup: `${baseUrl}/questionnaire/normgroup`,
  normgroupSoftDelete: `${baseUrl}/questionnaire/normgroup/soft-delete`,

  response: `${baseUrl}/response`,

  login: `${baseUrl}/auth/login`,
  forgotPassword: `${baseUrl}/auth/forgot-password`,
  resetPassword: `${baseUrl}/auth/reset-password`,
};
