// export const baseUrl = "http://localhost:5000";
export const baseUrl = "http://leerlens-backend-nestjs-env-env.eba-4m4wcq8f.us-east-1.elasticbeanstalk.com"

export const leerLensApi = {
  studentFormInfo: `${baseUrl}/studentFormInfo`,
  preIntervention: `${baseUrl}/questionnaire/pre-intervention`,
  postIntervention: `${baseUrl}/questionnaire/post-intervention`,
  evaluation: `${baseUrl}/questionnaire/evaluation`,
  normgroup: `${baseUrl}/questionnaire/normgroup`,

  response: `${baseUrl}/response`,

  login: `${baseUrl}/auth/login`,
  forgotPassword: `${baseUrl}/auth/forgot-password`,
  resetPassword: `${baseUrl}/auth/reset-password`,
};
