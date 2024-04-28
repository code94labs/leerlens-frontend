import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Box, IconButton, Stack, Typography } from "@mui/material";

import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DyanmicListHeader from "./DyanmicListHeader";
import DyanmicListContent from "./DyanmicListContent";
import { StudentResponse } from "../../utils/types";
import {
  FieldType,
  QuestionnaireSection,
  evaluationTypesTitles,
} from "../../utils/enum";
import { formatTimeStamp } from "../../utils/helper";

const customStyles = {
  icon: {
    color: "#1A1A1A",
  },
  accordionSummary: {
    backgroundColor: "white",
  },
};

type Props = {
  response: StudentResponse;
};

const ResponseAccordion = (props: Props) => {
  const { response } = props;

  const accordionSummary = (
    <AccordionSummary sx={customStyles.accordionSummary}>
      <Typography sx={{ width: 200 }}>
        {response.createdAt &&
          formatTimeStamp(new Date(response.createdAt).toDateString())}
      </Typography>

      <Typography sx={{ flex: 1 }}>
        {evaluationTypesTitles[response.formType]}
      </Typography>

      <Box>
        <IconButton>
          <KeyboardArrowDownRoundedIcon sx={customStyles.icon} />
        </IconButton>

        <IconButton>
          <BorderColorRoundedIcon sx={customStyles.icon} />
        </IconButton>

        <IconButton>
          <DeleteOutlinedIcon sx={customStyles.icon} />
        </IconButton>
      </Box>
    </AccordionSummary>
  );

  const personalDetails = (
    <Stack mt={-3}>
      <DyanmicListHeader title="Personal details" subTitle="Answers" />

      <Stack>
        {response.studentDetails.map((studentInfo) => (
          <DyanmicListContent
            question={studentInfo.questionTitle}
            answer={
              studentInfo.fieldType === FieldType.DropDown
                ? studentInfo.dropdownTitle
                : studentInfo.answer
            }
          />
        ))}
      </Stack>
    </Stack>
  );

  const questionSetOne = (
    <Stack mt={-3}>
      <DyanmicListHeader title="Question | Part 01" subTitle="Answers" />

      <Stack>
        {response.responses
          .filter(
            (item) =>
              item.questionSection === QuestionnaireSection.QuestionPartOne
          )
          .map((question, index) => (
            <DyanmicListContent
              key={index}
              question={`${question.questionId}. ${question.questionTitle}`}
              answer={question.answerText}
            />
          ))}
      </Stack>
    </Stack>
  );

  const questionSetTwo = (
    <Stack mt={-3}>
      <DyanmicListHeader title="Question | Part 02" subTitle="Answers" />

      <Stack>
        {response.responses
          .filter(
            (item) =>
              item.questionSection === QuestionnaireSection.QuestionPartTwo
          )
          .map((question, index) => (
            <DyanmicListContent
              key={index}
              question={`${question.questionId}. ${question.questionTitle}`}
              answer={question.answerText}
            />
          ))}
      </Stack>
    </Stack>
  );

  const supervisorEvaluation = <></>;

  const final = <></>;

  const accordionContent = (
    <AccordionDetails>
      {personalDetails}

      {questionSetOne}

      {questionSetTwo}

      {supervisorEvaluation}

      {final}
    </AccordionDetails>
  );
  return (
    <Accordion>
      {accordionSummary}

      {accordionContent}
    </Accordion>
  );
};

export default ResponseAccordion;
