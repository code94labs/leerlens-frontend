import { Stack } from "@mui/material";
import React from "react";
import Header from "../../../shared/Header/Header";
import PostInterventionForm from "../../../components/PostInterventionForm/PostInterventionForm";

const PostIntervention = () => {
  return (
    <Stack>
      <Header />

      <PostInterventionForm />
    </Stack>
  );
};

export default PostIntervention;
