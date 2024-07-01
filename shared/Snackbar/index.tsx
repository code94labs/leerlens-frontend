import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const customStyles = {
  snackbarAlert: {
    width: "100%",
    bgcolor: "white",
    fontWeight: 600,
    borderRadius: 2,
    border: "none",
  },
};

interface Props {
  displaySnackbarMsg: boolean;
  setDisplaySnackbarMsg: React.Dispatch<React.SetStateAction<boolean>>;
  notificationMsg: string;
  isError: boolean;
}

const SnackbarComponent = ({
  displaySnackbarMsg,
  setDisplaySnackbarMsg,
  notificationMsg,
  isError,
}: Props) => (
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

export default SnackbarComponent;