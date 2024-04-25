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
