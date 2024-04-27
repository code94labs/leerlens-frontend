export enum FormEvaluation {
  PreInterventions = 0,
  PostInterventions = 1,
  Normgroup = 2,
  Evaluation = 3,
}

export enum FieldType {
  DropDown = 0,
  TextField = 1,
  TextArea = 2,
  Scale1to6 = 3,
  Scale1to10 = 4,
}

export enum SectionType {
  PersonalDetails = 0,
  ProgramAndSupervisor = 1,
  Final = 2,
}

export enum UserRole {
  SuperAdmin = 0,
  Admin = 1,
}

export enum QuestionnaireSection {
  QuestionPartOne = 0,
  QuestionPartTwo = 1,
}

export enum QuestionnaireSet {
  QuestionSetOne = 0,
  QuestionSetTwo = 1,
}

/* We will be using this to differentiate the 2 sets of questions */
export enum RemindProgramQuestionSetID {
  QuestionSetOne = 0,
  QuestionSetTwo = 1,
}

export const fieldTypeTitles = {
  [FieldType.DropDown]: "Drop down",
  [FieldType.TextField]: "Text",
  [FieldType.TextArea]: "Text area",
  [FieldType.Scale1to6]: "Scale 1 to 6",
  [FieldType.Scale1to10]: "Scale 1 to 10",
};

export const evaluationTypesTitles = {
  [FormEvaluation.PreInterventions]: "Pre-Intervention",
  [FormEvaluation.PostInterventions]: "Post-Intervention",
  [FormEvaluation.Evaluation]: "Evaluation",
  [FormEvaluation.Normgroup]: "Normgroup",
};
