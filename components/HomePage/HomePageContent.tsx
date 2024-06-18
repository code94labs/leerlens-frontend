import { Stack } from "@mui/material";
import React from "react";
import FormCard from "./FormCard";

const customStyles = {
  stack: {
    // width: { md: "90%" },
    maxWidth: 1200,
    mx: "auto",
    my: 4,
    gap: {
      xs: 2,
      md: 4,
    },
  },
  innerStack: {
    flexDirection: {
      sm: "column",
      md: "row",
    },
  },
};

const HomePageContent = () => {
  return (
    <Stack sx={customStyles.stack}>
      <Stack flexDirection="row" sx={customStyles.innerStack}>
        <FormCard
          title="Pre-Intervention"
          description="Great that you are participating in the learning scan! Completing the learning scan takes approximately five minutes. Answer the questions as honestly as possible: there is no right or wrong. With all the answers we collect we can investigate what you think about learning. Goodluck!"
          pagePath="/forms/pre-intervention"
        />

        <FormCard
          title="Post-Intervention"
          description="Great that you are participating in the learning scan! Completing the learning scan takes approximately five minutes. Answer the questions as honestly as possible: there is no right or wrong. With all the answers we collect we can investigate what you think about learning. Goodluck!"
          pagePath="/forms/post-intervention"
        />
      </Stack>

      <Stack flexDirection="row" sx={customStyles.innerStack}>
        <FormCard
          title="Remind Evaluation"
          description="How cool that you did one or more training sessions with us. We have done our best to make it as fun and educational as possible for you and are very curious about what you thought of it. That's why we have a few questions for you. Answer them honestly, whether you are positive or negative about the training, we can learn from it! :)"
          pagePath="/forms/remind-evaluation"
        />

        <FormCard
          title="Teachers"
          description="Great that you are participating in the learning scan! Completing the learning scan takes approximately five minutes. Answer the questions as honestly as possible: there is no right or wrong. With all the answers we collect we can investigate what you think about learning. Goodluck!"
          pagePath="/teachers"
        />
      </Stack>
    </Stack>
  );
};

export default HomePageContent;
