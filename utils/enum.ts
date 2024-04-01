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
  Scale = 3,
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

/* We will be using this to differentiate the 2 sets of questions */
export enum RemindProgramQuestionSetID {
  QuestionSetOne = 0,
  QuestionSetTwo = 1,
}
