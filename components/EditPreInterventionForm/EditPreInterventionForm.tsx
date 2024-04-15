import {
  Alert,
  Button,
  CircularProgress,
  Divider,
  Snackbar,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { SyntheticEvent, useState } from "react";
import CustomMenuButton from "./CustomMenuButton";
import DynamicField from "../../shared/DynamicField/DynamicField";
import { FieldType } from "../../utils/enum";

const customStyles = {
  snackbarAlert: {
    width: "100%",
    bgcolor: "white",
    fontWeight: 600,
    borderRadius: 2,
    border: "none",
  },
  menuNavigation: {
    backgroundColor: "#F2EEFB",
    height: "82vh",
  },
  tabs: {
    "& .Mui-selected": {
      color: "black",
      fontWeight: "bold",
      fontSize: 15,
      borderBottom: "5px solid #A879FF",
    },
    "& .MuiButtonBase-root": {
      textTransform: "initial",
      mx: 2,
      my: 0.5,
      color: "black !important",
      borderBottom: "1px solid #98989A",
      alignItems: "flex-start",
      pl: 0,
      pb: 2.5,
    },
    "& .MuiTabs-indicator": {
      display: "none",
    },
  },
  formContent: {
    backgroundColor: "#F8F8F8",
    overflowY: "auto",
    height: "80vh",
  },
};

const menuItems = [
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
];

const EditPreInterventionForm = () => {
  const [value, setValue] = useState(0);

  const [displaySnackbarMsg, setDisplaySnackbarMsg] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const snackbar = (
    <Snackbar
      open={displaySnackbarMsg}
      autoHideDuration={6000}
      onClose={() => setDisplaySnackbarMsg(false)}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <Alert
        onClose={() => setDisplaySnackbarMsg(false)}
        severity={isError ? "error" : "success"}
        variant="outlined"
        sx={customStyles.snackbarAlert}
      >
        {notificationMsg}
      </Alert>
    </Snackbar>
  );

  const loading = (
    <Stack
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      height="50vh"
    >
      <CircularProgress sx={{ color: "#A879FF" }} />
    </Stack>
  );

  const renderTabContent = (tabValue: number) => {
    switch (tabValue) {
      case 0:
        return (
          <>
            <DynamicField
              title="Personal Details"
              label="Question heading"
              fieldType={FieldType.TextField}
            />
            <DynamicField
              title="Description"
              label="Question heading description"
              fieldType={FieldType.TextArea}
            />
            <DynamicField
              title="Sub heading"
              label="Question heading"
              fieldType={FieldType.TextField}
            />
            <DynamicField
              title="Question : 1"
              label="Type Question"
              fieldType={FieldType.Scale1to6}
              isQuestionnaireType={true}
            />
            <DynamicField
              title="Question : 2"
              label="Type Question"
              fieldType={FieldType.Scale1to6}
              isQuestionnaireType={true}
            />
            <DynamicField
              title="Question : 3"
              label="Type Question"
              fieldType={FieldType.Scale1to6}
              isQuestionnaireType={true}
            />

            <Divider sx={{ m: 5 }} />
          </>
        );
      case 1:
        return <Typography>Item 02</Typography>;
      case 2:
        return <Typography>Item 03</Typography>;
      default:
        return null;
    }
  };

  const menuNavigation = (
    <Stack flex={0.17} sx={customStyles.menuNavigation}>
      <Tabs
        value={value}
        onChange={handleChange}
        orientation="vertical"
        sx={customStyles.tabs}
      >
        {menuItems.map((item) => (
          <Tab value={item.id} label={item.title} />
        ))}
      </Tabs>
    </Stack>
  );

  const formContent = (
    <Stack flex={0.83}>
      {isLoading ? (
        loading
      ) : (
        <Stack
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="space-between"
          sx={customStyles.formContent}
        >
          {renderTabContent(value)}
        </Stack>
      )}
    </Stack>
  );

  return (
    <>
      <Stack flexDirection="row">
        {menuNavigation}

        {formContent}
      </Stack>

      {snackbar}
    </>
  );
};

export default EditPreInterventionForm;
