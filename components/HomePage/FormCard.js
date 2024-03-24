import {
  Box,
  Button,
  Stack,
  Typography,
  Modal,
  TextField,
  IconButton,
  Snackbar,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import QRCode from "qrcode.react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useRouter } from "next/router";

const customStyles = {
  card: {
    border: "1px #E6E6E6 solid",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  },
  boxBtn: {
    width: "80%",
  },
  dialogBtnStack: {
    "> :first-child": {
      mr: 1,
    },
    "> :last-child": {
      ml: 1,
    },
  },
  primaryBtn: {
    backgroundColor: "#A879FF",
    borderRadius: 2,
    textTransform: "initial",
    fontWeight: "bold",
    border: "2px #A879FF solid",
    padding: 1.3,
    "&:hover": {
      backgroundColor: "white",
      color: "#A879FF",
    },
  },
  secondaryBtn: {
    backgroundColor: "white",
    color: "#A879FF",
    borderRadius: 2,
    textTransform: "initial",
    fontWeight: "bold",
    border: "2px #A879FF solid",
    padding: 1.3,
    "&:hover": {
      backgroundColor: "white",
      color: "#A879FF",
    },
  },
  circleIcon: {
    color: "green",
    ml: 1,
  },
  modalContent: {
    position: "absolute",
    width: 400,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 2,
  },
  textField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 3,
    },
  },
  snackbar: {
    "& .MuiSnackbarContent-root": {
      backgroundColor: "white",
      color: "black",
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
    },
  },
  snackbarMsg: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  copyLinkBtn: {
    transform: "rotate(-45deg)",
  },
};

const FormCard = (props) => {
  const { title, description, pagePath, image } = props;

  const router = useRouter();

  const [openDialog, setOpenDialog] = useState(false);
  const [displaySnackbar, setDisplaySnackbar] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const handleOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleCloseSnackbar = () => {
    setDisplaySnackbar(false);
  };

  const handleFormNavigation = () => {
    router.push(pagePath);
  }

  const downloadQR = () => {
    const qrCodeURL = document
      .getElementById("qrCodeEl")
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    console.log(qrCodeURL);
    let aEl = document.createElement("a");
    aEl.href = qrCodeURL;
    aEl.download = "QR_Code.png";
    document.body.appendChild(aEl);
    aEl.click();
    document.body.removeChild(aEl);

    setNotificationMessage("Successfully downloaded QR Code");
    setDisplaySnackbar(true);
  };

  const qrDialogModel = (
    <Box
      sx={customStyles.modalContent}
      display="flex"
      flexDirection="column"
      alignItems="center"
      p={2}
      py={4}
    >
      <Typography variant="h6" fontWeight={800} mb={2}>
        Scan QR Code
      </Typography>

      <QRCode id="qrCodeEl" value={pagePath} />

      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        mt={2}
      >
        <IconButton sx={customStyles.copyLinkBtn}>
          <LinkRoundedIcon />
        </IconButton>

        <TextField
          value={pagePath}
          variant="outlined"
          margin="normal"
          disabled
          sx={customStyles.textField}
        />
      </Stack>

      <Stack
        flexDirection="row"
        width="100%"
        sx={customStyles.dialogBtnStack}
        py={2}
      >
        <Button
          variant="contained"
          sx={{ ...customStyles.primaryBtn, ml: 1 }}
          fullWidth
          onClick={handleClose}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          sx={{ ...customStyles.secondaryBtn, mr: 1 }}
          fullWidth
          onClick={downloadQR}
        >
          Download QR
        </Button>
      </Stack>
    </Box>
  );

  return (
    <Stack
      sx={customStyles.card}
      flexDirection="row"
      mt={4}
      mx={4}
      p={5}
      borderRadius={2}
    >
      <Stack>
        <Typography variant="h4" fontWeight={800} mb={2}>
          {title}
        </Typography>
        <Typography width="85%" mb={2}>
          {description}
        </Typography>

        <Box sx={customStyles.boxBtn} display="flex" mt={2} mb={2}>
          <Button
            variant="contained"
            sx={{ ...customStyles.primaryBtn, mr: 1 }}
            fullWidth
            onClick={handleFormNavigation}
          >
            Start {title}
          </Button>

          <Button
            variant="contained"
            sx={{ ...customStyles.secondaryBtn, ml: 1 }}
            fullWidth
            onClick={handleOpen}
          >
            View QR Code
          </Button>
        </Box>
      </Stack>

      <Stack>
        <Image src={image} height={200} width={250} alt="img" />
      </Stack>

      <Modal
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {qrDialogModel}
      </Modal>

      <Snackbar
        open={displaySnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={
          <span style={customStyles.snackbarMsg}>
            <span>{notificationMessage}</span>

            <CheckCircleIcon sx={customStyles.circleIcon} />
          </span>
        }
        sx={customStyles.snackbar}
      />
    </Stack>
  );
};

export default FormCard;
