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

      <Stack sx={customStyles.stack}>
        <FormCard
          title="Teachers"
          description="Great that you are participating in the learning scan! Completing the learning scan takes approximately five minutes. Answer the questions as honestly as possible: there is no right or wrong. With all the answers we collect we can investigate what you think about learning. Goodluck!"
          pagePath="/teachers"
          image="/images/img1.png"
        />
      </Stack>
    </Stack>
  );
};

export default LandingPage;
