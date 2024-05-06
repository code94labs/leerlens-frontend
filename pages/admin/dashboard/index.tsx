import { Button, ButtonGroup, Stack, Typography } from "@mui/material";
import React from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../../shared/Sidebar/Sidebar";
import AdminHeader from "../../../shared/Header/AdminHeader";

const DashboardPage = () => {
  const router = useRouter();

  const testComponent = (
    <>
      <Typography variant="h4" textAlign="center" mt={5}>
        Chart types and variations
      </Typography>

      <ButtonGroup
        variant="contained"
        aria-label="Basic button group"
        sx={{ marginTop: 5, marginX: 5 }}
      >
        <Button
          onClick={() => router.push("./dashboard/vertical-bar-chart-01")}
        >
          Vertical bar charts - Type 01
        </Button>
        <Button>Vertical bar charts - Type 02</Button>
        <Button>Line charts</Button>
      </ButtonGroup>
    </>
  );

  return (
    <Stack direction="row">
      <Sidebar />

      <Stack width={"100%"}>
        <AdminHeader title="Dashboard" shouldDisplayBreadcrumb />

        {testComponent}
        {/* Content */}
      </Stack>
    </Stack>
  );
};

export default DashboardPage;
