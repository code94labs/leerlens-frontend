import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Button from "@mui/material/Button";
import { Box, IconButton, Stack, Typography } from "@mui/material";

import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DyanmicListHeader from "./DyanmicListHeader";
import DyanmicListContent from "./DyanmicListContent";

const customStyles = {
  icon: {
    color: "#1A1A1A",
  },
  accordionSummary: {
    backgroundColor: "white",
  },
};

const ResponseAccordion = () => {
  const accordionSummary = (
    <AccordionSummary sx={customStyles.accordionSummary}>
      <Typography sx={{ width: 200 }}>2024/02/22</Typography>

      <Typography sx={{ flex: 1 }}>Pre-Intervention</Typography>

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

      {/* we should have a state for this list render */}
      <Stack>
        <DyanmicListContent
          question="What school are you at?"
          answer="ABC Northern Lights"
        />
        <DyanmicListContent question="What do you study?" answer="VMBO GL" />
        <DyanmicListContent
          question="What grade are you in?"
          answer="Grade 6"
        />
        <DyanmicListContent question="In which class are you?" answer="12th" />
        <DyanmicListContent
          question="Which Remind program are you following?"
          answer="Student training"
        />
      </Stack>
    </Stack>
  );

  const questionSetOne = (
    <Stack mt={-3}>
      <DyanmicListHeader title="Question | Part 01" subTitle="Answers" />

      {/* we should have a state for this list render */}
      <Stack>
        <DyanmicListContent
          question="1. Intelligence is sometahing you are born with and cannot change."
          answer="Completely disagree 01"
        />
        <DyanmicListContent
          question="2. I know how to motivate myself to learn."
          answer="Somewhat agree 05"
        />
        <DyanmicListContent
          question="3. I know many different tips, strategies and ways to learn smart"
          answer="Completely disagree 01"
        />
        <DyanmicListContent
          question="4. I can't really bring myself to learn when there are other interesting things to do"
          answer="Somewhat agree 05"
        />
      </Stack>
    </Stack>
  );

  const questionSetTwo = (
    <Stack mt={-3}>
      <DyanmicListHeader title="Question | Part 02" subTitle="Answers" />

      {/* we should have a state for this list render */}
      <Stack>
        <DyanmicListContent
          question="1. Intelligence is sometahing you are born with and cannot change."
          answer="Completely disagree 01"
        />
        <DyanmicListContent
          question="2. I know how to motivate myself to learn."
          answer="Somewhat agree 05"
        />
        <DyanmicListContent
          question="3. I know many different tips, strategies and ways to learn smart"
          answer="Completely disagree 01"
        />
        <DyanmicListContent
          question="4. I can't really bring myself to learn when there are other interesting things to do"
          answer="Somewhat agree 05"
        />
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
