import { FieldType, FormEvaluation, SectionType } from "./enum";

export type DropDownOptions = {
  id: number;
  item: string;
  isDelete: boolean;
};

export type Question = {
  id: number;
  formType: FormEvaluation;
  questionText: string;
  fieldType: FieldType;
  sectionType: SectionType;
  positionOrderId: number;
  dropdownOptions: DropDownOptions[];
  minValue: number;
  maxValue: number;
};

export type FormQuestion = {
  id: number;
  questionText: string;
  positionOrderId: number;
  minValue: number;
  maxValue: number;
  isDelete: boolean;
  questionSetId: number;
  questionSection: number;
  answer?: number | string;
};

export type PersonalDetails = {
  [key: number]: string;
};

export type QuestionniareAnswer = {
  questionId: number;
  answer: number;
  questionTitle?: string;
  answerText?: string;
  questionSection?: number;
};

export type StudentDetailsAnswer = {
  questionId: number;
  answer: string | number;
  fieldType: FieldType;
  questionTitle?: string;
  dropdownTitle?: string;
  sectionType?: SectionType;
};

export type CreateStudentResponse = {
  formType: FormEvaluation;
  responses: QuestionniareAnswer[];
  studentDetails: StudentDetailsAnswer[];
  createdAt?: string;
  updateAt?: string;
};

export type UpdateQuestionResponse = {
  questionId: number;
  answer: string | number;
};

export type UpdateStudentResponse = {
  studentDetails: UpdateQuestionResponse[]
}

export type StudentResponse = CreateStudentResponse & {
  id: number;
};
