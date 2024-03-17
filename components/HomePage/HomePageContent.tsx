import { Stack } from "@mui/material";
import React from "react";
import FormCard from "./FormCard";

const customStyles = {
  stack: {
    width: "90%",
    maxWidth: 1200,
    margin: "0 auto",
    mb: 20
  },
};

const HomePageContent = () => {
  return (
    <Stack sx={customStyles.stack}>
      <FormCard
        title="Pre-Intervention"
        description="Great that you are participating in the learning scan! Completing the learning scan takes approximately five minutes. Answer the questions as honestly as possible: there is no right or wrong. With all the answers we collect we can investigate what you think about learning. Goodluck!"
        qrLink="/"
        image="/images/img1.png"
      />

      <FormCard
        title="Post-Intervention"
        description="Great that you are participating in the learning scan! Completing the learning scan takes approximately five minutes. Answer the questions as honestly as possible: there is no right or wrong. With all the answers we collect we can investigate what you think about learning. Goodluck!"
        qrLink="/"
        image="/images/img2.png"
      />

      <FormCard
        title="Remind Evaluation"
        description="How cool that you did one or more training sessions with us. We have done our best to make it as fun and educational as possible for you and are very curious about what you thought of it. That's why we have a few questions for you. Answer them honestly, whether you are positive or negative about the training, we can learn from it! :)"
        qrLink="/"
        image="/images/img3.png"
      />

      <FormCard
        title="Normgroup"
        description="How cool that you did one or more training sessions with us. We have done our best to make it as fun and educational as possible for you and are very curious about what you thought of it. That's why we have a few questions for you. Answer them honestly, whether you are positive or negative about the training, we can learn from it! :)"
        qrLink="/"
        image="/images/img4.png"
      />
    </Stack>
  );
};

export default HomePageContent;
