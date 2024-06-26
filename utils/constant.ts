import { SentimentQuestionType, SummaryTypes } from "./enum";

export const QuestionSetMenuItems = [
  {
    id: 0,
    title: "Personal Details",
  },
  {
    id: 1,
    title: "Question | Part 01",
  },
  {
    id: 2,
    title: "Question | Part 02",
  },
  {
    id: 3,
    title: "Program and the supervisors",
  },
  {
    id: 4,
    title: "Final",
  },
];

export const questionSetTabs = {
  personalDetails: 0,
  quesitonSetOne: 1,
  quesitonSetTwo: 2,
  programAndSupervisor: 3,
  final: 4,
};

export const schoolList = [
  { id: 0, schoolName: "All" }, // for the dropdown options
  { id: 1, schoolName: "Aeres Hogeschool Dronten" },
  { id: 2, schoolName: "Aeres MBO Almere" },
  { id: 3, schoolName: "Aeres MBO Ede" },
  { id: 4, schoolName: "Aeres MBO Velp" },
  { id: 5, schoolName: "Aeres VMBO Almere" },
  { id: 6, schoolName: "Aeres VMBO Ede" },
  { id: 7, schoolName: "Aeres VMBO Sneek" },
  { id: 8, schoolName: "Aeres VMBO Velp" },
  { id: 9, schoolName: "Albeda" },
  { id: 10, schoolName: "Alfrink College" },
  { id: 11, schoolName: "Antoniuscollege Gouda" },
  { id: 12, schoolName: "Baanderheren" },
  { id: 13, schoolName: "Bertrand Russell College" },
  { id: 14, schoolName: "C.S.G het Noordik" },
  { id: 15, schoolName: "Canisius Almelo" },
  { id: 16, schoolName: "Canisius Tubbergen" },
  { id: 17, schoolName: "Christelijke Scholengemeenschap Schaersvoorde" },
  { id: 18, schoolName: "College den Hulster" },
  { id: 19, schoolName: "Commanderij College" },
  { id: 20, schoolName: "CSG Eekeringe" },
  { id: 21, schoolName: "CSG Willem de Zwijger" },
  { id: 22, schoolName: "De Goudse Waarden" },
  { id: 23, schoolName: "De Passie Utrecht" },
  { id: 24, schoolName: "De Passie Wierden" },
  { id: 25, schoolName: "Den hulster" },
  { id: 26, schoolName: "Dollard College" },
  { id: 27, schoolName: "Dr. Nassau College Quintus" },
  { id: 28, schoolName: "Farel College" },
  { id: 29, schoolName: "Fons Vitae Lyceum" },
  { id: 30, schoolName: "Gerrit Komrij College" },
  { id: 31, schoolName: "Goudse Waarden" },
  { id: 32, schoolName: "GSG Leo Vroman" },
  { id: 33, schoolName: "Hageveld College" },
  { id: 34, schoolName: "Hartenlust" },
  { id: 35, schoolName: "Herman Jordan MLU" },
  { id: 36, schoolName: "Hervormd Lyceum West" },
  { id: 37, schoolName: "Het Element" },
  { id: 38, schoolName: "Het Hogeland College Warffum" },
  { id: 39, schoolName: "Het Streek Lyceum" },
  { id: 40, schoolName: "Hogelant College" },
  { id: 41, schoolName: "Hogeschool InHolland" },
  { id: 42, schoolName: "Ida acc. Gtown" },
  { id: 43, schoolName: "Ida gerhardt academie" },
  { id: 44, schoolName: "Ir Lely Lyceum" },
  { id: 45, schoolName: "Isendoorn College" },
  { id: 46, schoolName: "IVKO" },
  { id: 47, schoolName: "Johannes Fontanus College" },
  { id: 48, schoolName: "Joke Smit" },
  { id: 49, schoolName: "Kaj Munk college" },
  { id: 50, schoolName: "Kalsbeek College" },
  { id: 51, schoolName: "Kamerlingh Onnes" },
  { id: 52, schoolName: "Keizer Karel College" },
  { id: 53, schoolName: "KSG Apeldoorn" },
  { id: 54, schoolName: "KWC Culemborg" },
  { id: 55, schoolName: "Laurens Lyceum" },
  { id: 56, schoolName: "Leidsche Rijn College" },
  { id: 57, schoolName: "Lek en Linge" },
  { id: 58, schoolName: "Lorentz casimir" },
  { id: 59, schoolName: "Lorentz Casimir Lyceum" },
  { id: 60, schoolName: "Lorentz Casimir lyceum" },
  { id: 61, schoolName: "Lorentz Lyceum" },
  { id: 62, schoolName: "Meerweg scholen farel" },
  { id: 63, schoolName: "Melanchthon Bergschenhoek" },
  { id: 64, schoolName: "Melanchthon Kralingen" },
  { id: 65, schoolName: "Melanchthon Mavo Schiebroek" },
  { id: 66, schoolName: "Melanchthon Schiebroek" },
  { id: 67, schoolName: "Melanchthon Schiebroek MAVO" },
  { id: 68, schoolName: "Mendel College" },
  { id: 69, schoolName: "Metis Montessori Lyceum" },
  { id: 70, schoolName: "Milton Peters College" },
  { id: 71, schoolName: "Minkema College" },
  { id: 72, schoolName: "Montessori Lyceum Amsterdam" },
  { id: 73, schoolName: "Montessori Lyceum Oostpoort" },
  { id: 74, schoolName: "O.R.S. Lek en Linge" },
  { id: 75, schoolName: "ONC Clauslaan" },
  { id: 76, schoolName: "OPDC Groningen" },
  { id: 77, schoolName: "Parcival College" },
  { id: 78, schoolName: "Passie Utrecht" },
  { id: 79, schoolName: "Peelland College" },
  { id: 80, schoolName: "Petrus Canisius College, Het Lyceum" },
  { id: 81, schoolName: "Pieter Nieuwland College" },
  { id: 82, schoolName: "Pieter Zandt" },
  { id: 83, schoolName: "Pvo Amsterdam" },
  { id: 84, schoolName: "Pvo Deventer" },
  { id: 85, schoolName: "Pvo Geldermalsen" },
  { id: 86, schoolName: "Pvo Hengelo" },
  { id: 87, schoolName: "Pvo Hoorn" },
  { id: 88, schoolName: "Pvo Hurdegaryp" },
  { id: 89, schoolName: "Pvo Kapelle" },
  { id: 90, schoolName: "Pvo Utrecht" },
  { id: 91, schoolName: "Quintus - Dr. Nassau College" },
  { id: 92, schoolName: "Quintus Assen" },
  { id: 93, schoolName: "Revius Lyceum" },
  { id: 94, schoolName: "Rijnlands Lyceum Wassenaar" },
  { id: 95, schoolName: "Roelof van Echten College" },
  { id: 96, schoolName: "ROER College Schöndeln" },
  { id: 97, schoolName: "RSG Trompmeesters" },
  { id: 98, schoolName: "Scholengemeenschap Sint Ursula" },
  { id: 99, schoolName: "Segbroek College" },
  { id: 100, schoolName: "Sint jozef mavo" },
  { id: 101, schoolName: "Sint Nicolaas Lyceum" },
  { id: 102, schoolName: "Sint Oelbert Gymnasium" },
  { id: 103, schoolName: "Sophianum" },
  { id: 104, schoolName: "Spinoza Lyceum" },
  { id: 105, schoolName: "Stedelijk College Eindhoven" },
  { id: 106, schoolName: "Stedelijk Gymnasium Den Bosch" },
  { id: 107, schoolName: "Stedelijk Gymnasium Utrecht" },
  { id: 108, schoolName: "Tjalling koopman college" },
  { id: 109, schoolName: "Topsport Talentschool Groningen" },
  { id: 110, schoolName: "Udens College" },
  { id: 111, schoolName: "Utrechts Stedelijk Gymnasium" },
  { id: 112, schoolName: "VONK Amsterdam" },
  { id: 113, schoolName: "Werkmancollege TTS" },
  { id: 114, schoolName: "Willem de Zwijger Papendrecht" },
  { id: 115, schoolName: "Willibrord Gymnasium" },
  { id: 116, schoolName: "Zadkine MBO" },
  { id: 117, schoolName: "Zadkine Sportlaan 13" },
  { id: 118, schoolName: "Zuider Gymnasium" },
];

export const studyFieldList = [
  { id: 0, studyField: "All" }, // for dropdown options
  { id: 1, studyField: "Havo" },
  { id: 2, studyField: "VWO" },
  { id: 3, studyField: "Vmbo TL" },
  { id: 4, studyField: "Vmbo Kader" },
  { id: 5, studyField: "Vmbo Basis" },
];

export const gradeList = [
  { id: 0, grade: "All" }, // for dropdown options
  { id: 1, grade: "1" },
  { id: 2, grade: "2" },
  { id: 3, grade: "3" },
  { id: 4, grade: "4" },
  { id: 5, grade: "5" },
  { id: 6, grade: "6" },
];

export const remindProgramList = [
  {
    id: 1,
    sentence: "Leerlingentraining",
    questionSetId: 1,
  },
  {
    id: 2,
    sentence: "Mentorlessen over slim jezelf zijn",
    questionSetId: 2,
  },
  {
    id: 3,
    sentence: "Startdag",
    questionSetId: 1,
  },
  {
    id: 4,
    sentence: "Doorstroomprogramma vmbo-mbo of mavo-havo",
    questionSetId: 2,
  },
  {
    id: 5,
    sentence: "Examentraining",
    questionSetId: 2,
  },
  {
    id: 6,
    sentence: "Zomerschool, herfstschool of lenteschool",
    questionSetId: 1,
  },
  {
    id: 7,
    sentence: "Remind in de middag / Ondersteuningsprogramma",
    questionSetId: 2,
  }
];

// remindLearningProgram for filter
export const remindProgramListForFilters = [
  {
    id: 0,
    sentence: "All",
    questionSetId: 1,
  },
  ...remindProgramList,
];

// TODO: GET THE ACTUAL DATA FOR THIS
export const ageList = [
  { id: 0, age: "All" },
  { id: 17, age: "17" },
  { id: 18, age: "18" },
  { id: 19, age: "19" },
  { id: 20, age: "20" },
  { id: 21, age: "21" },
];

// TODO: GET THE ACTUAL DATA FOR THIS
export const completeSentenceList = [
  { id: 1, sentence: "Program 01" },
  { id: 2, sentence: "Program 02" },
  { id: 3, sentence: "Program 03" },
  { id: 4, sentence: "Program 04" },
  { id: 5, sentence: "Program 05" },
];

export const classList = [];

export const gmailAddress = "https://mail.google.com";

export const dateFilterList = [
  "All",
  "2024/01/01 - 2024/12/31",
  "2023/01/01 - 2023/12/31",
  "2022/01/01 - 2022/12/31",
];

export const summaryTypes = [
  { id: SummaryTypes.demograficalData, label: "Demografical Data" },
  {
    id: SummaryTypes.experimentingWithLearning,
    label: "Experimenting With Learning",
  },
  { id: SummaryTypes.growthMindset, label: "Growth Mindset" },
  { id: SummaryTypes.ownership, label: "Ownership" },
];

export const sentimentTypes = [
  {
    id: SentimentQuestionType.Positive,
    label: "Positive",
  },
  {
    id: SentimentQuestionType.Negative,
    label: "Negative",
  },
]

export const chartColors = ["#EB7200", "#F5477C", "#A879FF", "#00A88D"];

// array of color combinations to be assigned for bar charts
export const barChartColorCombinations = [
  ["#F9C8A6", "#EB7200"],
  ["#DCC9FF", "#A879FF"],
  ["#FDB8CB", "#F5477C"],
  ["#AEDCD1", "#05A88D"],
];

export const barChartGrouColorPallete = [
  "#FFECAA", "#BDE5E5", "#CFC0D8", "#F8A0A0"
]
