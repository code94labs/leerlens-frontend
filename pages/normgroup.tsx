import { Stack } from "@mui/material";
import React from "react";
import Header from "../shared/Header/Header";
import HomePageContent from "../components/HomePage/HomePageContent";
import FormCard from "../components/HomePage/FormCard";

const customStyles = {
  stack: {
    width: "90%",
    maxWidth: 1200,
    margin: "0 auto",
    my: 4,
    gap: {
      xs: 2,
      md: 4,
    },
  },
};

const LandingPage = () => {
  return (
    <Stack>
      <Header />

      <Stack sx={customStyles.stack} flexDirection="row" justifyContent="center">
         <FormCard
          title="Normgroup"
          description="How cool that you did one or more training sessions with us. We have done our best to make it as fun and educational as possible for you and are very curious about what you thought of it. That's why we have a few questions for you. Answer them honestly, whether you are positive or negative about the training, we can learn from it! :)"
          pagePath="/forms/normgroup"
        />
      </Stack>
    </Stack>
  );
};

export default LandingPage;
