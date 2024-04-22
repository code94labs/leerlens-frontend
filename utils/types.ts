import { FieldType, FormEvaluation, SectionType } from "./enum";

export type DropDownOptions = {
  id: number;
  item: string;
  isDelete: boolean;
  isNewlyAdded?: boolean;
};

export interface Question {
  formType: FormEvaluation;
  questionText: string;
  fieldType: FieldType;
  sectionType: SectionType;
  positionOrderId: number;
  dropdownOptions: DropDownOptions[];
  minValue: number;
  maxValue: number;
  isDelete: boolean;
  isNewlyAdded: boolean;
}

export interface QuestionResponse extends Question {
  id: number;
}
