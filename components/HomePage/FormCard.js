import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
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
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import QRCode from "qrcode.react";

import { champBlackFontFamily } from "../../shared/typography";

import { useWindowSize } from "../../utils/hooks/useWindowSize";

const customStyles = {
  card: {
    border: "1px #E6E6E6 solid",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "row",
    mx: {
      xs: 0,
      md: 4,
    },
    p: {
      xs: 3,
      md: 5,
    },
    borderRadius: 2,
  },
  title: {
    fontWeight: 800,
    fontSize: {
      xs: 24,
      md: 34,
    },
    mb: {
      xs: 1,
      md: 2,
    },
    fontFamily: champBlackFontFamily,
  },
  description: {
    width: {
      xs: "100%",
      md: "85%",
    },
    fontSize: {
      xs: 14,
      md: 16,
    },
    mb: {
      xs: 2,
      md: 4,
    },
    textAlign: {
      xs: "justify",
      md: "left",
    },
  },
  boxBtn: {
    width: {
      xs: "100%",
      md: "80%",
    },
    display: "flex",
    flexDirection: {
      xs: "column",
      md: "row",
    },
    // mt: 2,
    // mb: 2,
    gap: {
      xs: 1,
      md: 4,
    },
  },
  primaryBtn: {
    backgroundColor: "#A879FF",
    color: "white",
    borderRadius: 2,
    textTransform: "initial",
    fontWeight: 900,
    border: "2px #A879FF solid",
    padding: {
      xs: 0.5,
      md: 1.3,
    },
    "&:hover": {
      backgroundColor: "#C4B0EB",
      color: "white",
      border: "2px #C4B0EB solid",
    },
    fontSize: {
      xs: 14,
      md: 16,
    },
    fontFamily: champBlackFontFamily,
  },
  secondaryBtn: {
    backgroundColor: "white",
    color: "#A879FF",
    borderRadius: 2,
    textTransform: "initial",
    fontWeight: 900,
    border: "2px #A879FF solid",
    padding: {
      xs: 0.5,
      md: 1.3,
    },
    "&:hover": {
      backgroundColor: "#C4B0EB",
      color: "white",
      border: "2px #C4B0EB solid",
    },
    fontSize: {
      xs: 14,
      md: 16,
    },
    fontFamily: champBlackFontFamily,
  },
  secondaryBtn: {
    backgroundColor: "white",
    color: "#A879FF",
    borderRadius: 2,
    textTransform: "initial",
    fontWeight: 900,
    border: "2px #A879FF solid",
    padding: {
      xs: 0.5,
      md: 1.3,
    },
    "&:hover": {
      backgroundColor: "#C4B0EB",
      color: "white",
      border: "2px #C4B0EB solid",
    },
    fontSize: {
      xs: 14,
      md: 16,
    },
    fontFamily: champBlackFontFamily,
  },
  circleIcon: {
    color: "green",
    ml: 1,
  },
  modalContent: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    px: {
      xs: 3,
      md: 6.25,
    },
    py: {
      xs: 2.5,
      md: 5.25,
    },
    width: {
      xs: "90%",
      md: 514,
    },
    boxSizing: "border-box",
  },
  modalTitle: {
    fontWeight: 900,
    fontSize: {
      xs: 20,
      md: 25,
    },
    mb: 2,
    fontFamily: champBlackFontFamily,
    textTransform: "uppercase",
  },
  modalStack: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    mt: 2,
    width: {
      xs: "100%",
      md: 290,
    },
    gap: 1,
  },
  textField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 3,
    },
    margin: 0,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    "& input::placeholder": {
      fontSize: 14,
      textAlign: "center",
    },
  },
  dialogBtnStack: {
    display: "flex",
    flexDirection: {
      xs: "column",
      md: "row",
    },
    justifyContent: "space-between",
    width: "100%",
    mt: {
      xs: 2,
      md: 4,
    },
    gap: {
      xs: 1,
      md: 2,
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
  imageStack: {
    display: {
      xs: "none",
      md: "flex",
    },
  },
};

const FormCard = (props) => {
  const { title, description, pagePath, image } = props;

  const router = useRouter();

  const [openDialog, setOpenDialog] = useState(false);
  const [displaySnackbar, setDisplaySnackbar] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const size = useWindowSize();

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
  };

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
    <Box sx={customStyles.modalContent}>
      <Typography variant="h6" sx={customStyles.modalTitle}>
        Scan QR Code
      </Typography>

      <QRCode
        id="qrCodeEl"
        value={pagePath}
        size={size.width > 900 ? 250 : 150}
      />

      <Stack sx={customStyles.modalStack}>
        <IconButton sx={customStyles.copyLinkBtn}>
          <LinkRoundedIcon />
        </IconButton>

        <TextField
          value={pagePath}
          variant="outlined"
          margin="normal"
          disabled
          sx={customStyles.textField}
          size={size.width > 900 ? "medium" : "small"}
        />
      </Stack>

      <Stack sx={customStyles.dialogBtnStack}>
        <Button
          variant="contained"
          sx={{
            ...customStyles.secondaryBtn,
            order: {
              xs: 2,
              md: 1,
            },
          }}
          fullWidth
          onClick={handleClose}
          disableElevation
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          sx={{
            ...customStyles.primaryBtn,
            order: {
              xs: 1,
              md: 2,
            },
          }}
          fullWidth
          onClick={downloadQR}
          disableElevation
        >
          Download QR
        </Button>
      </Stack>
    </Box>
  );

  return (
    <Stack sx={customStyles.card}>
      <Stack>
        <Typography variant="h4" sx={customStyles.title}>
          {title}
        </Typography>
        <Typography sx={customStyles.description}>{description}</Typography>

        <Box sx={customStyles.boxBtn}>
          <Button
            variant="contained"
            sx={customStyles.primaryBtn}
            fullWidth
            onClick={handleFormNavigation}
            disableElevation
          >
            Start {title}
          </Button>

          <Button
            variant="contained"
            sx={customStyles.secondaryBtn}
            fullWidth
            onClick={handleOpen}
            disableElevation
          >
            View QR Code
          </Button>
        </Box>
      </Stack>

      <Stack sx={customStyles.imageStack}>
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
