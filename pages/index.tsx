import { Stack } from "@mui/material";
import React from "react";
import Header from "../shared/Header/Header";
import HomePageContent from "../components/HomePage/HomePageContent";

const LandingPage = () => {
  return (
    <Stack>
      <Header />

      <HomePageContent />
    </Stack>
  );
};

export default LandingPage;
