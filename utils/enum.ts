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
  EvaluationPartTwo = 1,
}

export enum UserRole {
  SuperAdmin = 0,
  Admin = 1,
}

export enum QuestionnaireSection {
  QuestionPartOne = 0,
  QuestionPartTwo = 1,
}

export enum QuestionSetType {
  allSchools = 0,
  onlySeasonalSchools = 1,
}

/* We will be using this to differentiate the 2 sets of questions */
export enum RemindProgramQuestionSetID {
  QuestionSetOne = 0,
  QuestionSetTwo = 1,
}

export enum SummaryTypes {
  demograficalData = 0,
  experimentingWithLearning = 1,
  growthMindset = 2,
  ownership = 3,
}

// chart types for dashboard
export enum ChartType {
  numericalRepresentation = 0,
  progressIndicatorTypeOne = 1, // horizontal progress indicator
  progressIndicatorTypeTwo = 2, // semi circular progress indicator
  horizontalBarChartTypeOne = 3, // common horizontal bar chart
  horizontalBarChartTypeTwo = 4, // horizontal bar chart spanning both directions
  verticalBarChartTypeOne = 5, // with two bars
  verticalBarChartTypeTwo = 6, // with multiple bars(6/10) and with/without labels
  verticalBarChartTypeThree = 7, // individual bar chart (three bars)
  lineChart = 8,
}

export enum FilterationType {
  School = 1,
  Study = 2,
  Grade = 3,
  RemindProgram = 4,
  Class = 5,
  Age = 6,
}

export enum SentimentQuestionType {
  Positive = 1,
  Negative = 0,
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

// for managing loading states in dashboard pages
export enum APILoadingStates {
  summaryCharts = 0,
  statisticalCharts = 1,
  abosoluteDifference = 2,
  relativeDifference = 3,
}
