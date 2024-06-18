import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  FormControl,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";
import { champBlackFontFamily } from "../../shared/typography";
import { remindProgramList } from "../../utils/constant";
import {
  bulkUpdateClassName,
  bulkUpdateCourse,
} from "../../services/response.service";

type Props = {
  open: boolean;
  isClassEdit?: boolean;
  isCourseEdit?: boolean;
  selectedResponseIds: number[];
  setOpen: Dispatch<SetStateAction<boolean>>;
  setRefetch: Dispatch<SetStateAction<boolean>>;
};

const customStyles = {
  primaryButton: {
    backgroundColor: "#A879FF",
    color: "white",
    borderRadius: 2,
    textTransform: "initial",
    width: 180,
    border: "2px #A879FF solid",
    padding: 1.3,
    fontSize: 16,
    fontFamily: champBlackFontFamily,
    fontWeight: 400,
    "&:hover": {
      backgroundColor: "#C4B0EB",
      color: "white",
      border: "2px #C4B0EB solid",
    },
    "&:disabled": {
      backgroundColor: "#E6E6E6",
      color: "#98989A",
      border: "2px #E6E6E6 solid",
    },
  },
  secondaryButton: {
    backgroundColor: "white",
    color: "#A879FF",
    borderRadius: 2,
    textTransform: "initial",
    width: 180,
    border: "2px #A879FF solid",
    padding: 1.3,
    fontFamily: champBlackFontFamily,
    "&:hover": {
      backgroundColor: "#C4B0EB",
      color: "white",
      border: "2px #C4B0EB solid",
    },
  },
  title: {
    mb: 1,
    fontWeight: 1000,
    textTransform: "uppercase",
    fontFamily: champBlackFontFamily,
    color: "#1A1A1A",
  },
  dialog: {
    "& .MuiPaper-root": {
      borderRadius: 8,
    },
  },
  dialogContent: {
    minWidth: 500,
    my: 3,
  },
  dialogActions: {
    display: "flex",
    justifyContent: "space-between",
    mx: 2,
  },
  snackbarAlert: {
    width: "100%",
    bgcolor: "white",
    fontWeight: 600,
    borderRadius: 2,
    border: "none",
  },
};

const EditContentDialog = (props: Props) => {
  const {
    open,
    setOpen,
    isClassEdit,
    isCourseEdit,
    selectedResponseIds,
    setRefetch,
  } = props;

  const [course, setCourse] = useState(0);
  const [className, setClassName] = useState("");

  const [displaySnackbarMsg, setDisplaySnackbarMsg] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [maxWidth] = useState<DialogProps["maxWidth"]>("md");

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: any) => {
    setCourse(event.target.value as number);
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

  // Performing a get request action again to get the update course titles & note that this feature won't be used frequently by the client.
  const handleUpdate = async () => {
    try {
      setIsLoading(true);

      if (isClassEdit) {
        const reqBody = {
          newClass: className,
          responseIds: selectedResponseIds,
        };

        await bulkUpdateClassName(reqBody);

        setNotificationMsg("Successfully updated the class name");
        setDisplaySnackbarMsg(true);
      } else {
        const reqBody = {
          newCourseId: course,
          responseIds: selectedResponseIds,
        };

        await bulkUpdateCourse(reqBody);

        setNotificationMsg("Successfully updated the remind program");
        setDisplaySnackbarMsg(true);
      }

      handleClose();
    } catch (_) {
      setIsError(true);

      setNotificationMsg("Error when deleting student response...");
      setDisplaySnackbarMsg(true);
    } finally {
      setIsLoading(false);

      setRefetch(true);
    }
  };

  const inputClassEdit = (
    <DialogContent sx={customStyles.dialogContent}>
      <TextField
        placeholder="Class Name Here"
        value={className}
        onChange={(e) => setClassName(e.target.value)}
        fullWidth
      />
    </DialogContent>
  );

  const inputCourseEdit = (
    <DialogContent sx={customStyles.dialogContent}>
      <FormControl fullWidth>
        <Select value={course} onChange={handleChange}>
          <MenuItem value={0}>Select course here</MenuItem>

          {remindProgramList.map((course) => (
            <MenuItem value={course.id}>{course.sentence}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </DialogContent>
  );

  const dialogTitle = (
    <DialogTitle>
      <Typography variant="h5" sx={customStyles.title}>
        {isClassEdit && "EDIT CLASS NAME"}

        {isCourseEdit && "EDIT COURSE NAME"}
      </Typography>

      <Typography>
        {isClassEdit && "You can edit bulk editing of class names here."}

        {isCourseEdit && "You can edit bulk editing of course types here."}
      </Typography>
    </DialogTitle>
  );

  const dialogActionButtons = (
    <DialogActions sx={customStyles.dialogActions}>
      <Button
        onClick={handleClose}
        sx={customStyles.secondaryButton}
        disabled={isLoading}
      >
        Cancel
      </Button>

      <Button
        onClick={handleUpdate}
        sx={customStyles.primaryButton}
        disabled={isLoading}
      >
        {isLoading ? "Updating..." : "Update"}
      </Button>
    </DialogActions>
  );

  return (
    <>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        maxWidth={maxWidth}
        sx={customStyles.dialog}
      >
        <Box p={4}>
          {dialogTitle}

          {isClassEdit && inputClassEdit}

          {isCourseEdit && inputCourseEdit}

          {dialogActionButtons}
        </Box>
      </Dialog>

      {snackbar}
    </>
  );
};

export default EditContentDialog;
