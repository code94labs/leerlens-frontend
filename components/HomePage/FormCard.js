import { useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

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
  Alert,
} from "@mui/material";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import QRCode from "qrcode.react";

import { champBlackFontFamily } from "../../shared/typography";

import { useWindowSize } from "../../utils/hooks/useWindowSize";

const customStyles = {
  card: {
    maxWidth: 600,
    height: "100%",
    border: "1px #E6E6E6 solid",
    display: "flex",
    flexDirection: "column",
    mx: {
      xs: 0,
      md: 2,
    },
    borderRadius: 3,
  },
  innerCard: {
    p: {
      xs: 2,
      md: 3,
    },
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  title: {
    fontWeight: 800,
    textTransform: "uppercase",
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
    color: "#4C4C4D",
    width: "100%",
    fontSize: {
      xs: 14,
      md: 16,
    },
    mb: {
      xs: 2,
      md: 4,
    },
    textAlign: "justify",
  },
  boxBtn: {
    width: "100%",
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
    maxWidth: {
      xs: 360,
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
};

const FormCard = (props) => {
  const { title, description, pagePath } = props;

  const router = useRouter();

  const [openDialog, setOpenDialog] = useState(false);
  const [displayCopyLinkSnackbar, setDisplayCopyLinkSnackbar] = useState(false);
  const [displayDownloadQRSnackbar, setDisplayDownloadQRSnackbar] =
    useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const size = useWindowSize();

  const handleOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
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
    setDisplayDownloadQRSnackbar(true);
  };

  const qrDialogModel = (
    <Box sx={customStyles.modalContent}>
      <Typography variant="h6" sx={customStyles.modalTitle}>
        Scan QR Code
      </Typography>

      <QRCode
        id="qrCodeEl"
        value={process.env.BASE_URL + pagePath}
        size={size.width > 900 ? 250 : 150}
      />

      <Stack
        sx={customStyles.modalStack}
        onClick={() => {
          navigator.clipboard.writeText(process.env.BASE_URL + pagePath);
          setDisplayCopyLinkSnackbar(true);
        }}
      >
        <IconButton sx={customStyles.copyLinkBtn}>
          <LinkRoundedIcon />
        </IconButton>

        <TextField
          value={process.env.BASE_URL + pagePath}
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
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5 }}
      // sx={customStyles.card}
    >
      <Stack sx={customStyles.card}>
        <Stack sx={customStyles.innerCard}>
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

        <Modal
          open={openDialog}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          {qrDialogModel}
        </Modal>

        <Snackbar
          open={displayCopyLinkSnackbar}
          autoHideDuration={6000}
          onClose={() => setDisplayCopyLinkSnackbar(false)}
        >
          <Alert
            onClose={() => setDisplayCopyLinkSnackbar(false)}
            severity="success"
            variant="outlined"
            icon={false}
            sx={{
              width: "100%",
              bgcolor: "white",
              color: "#A879FF",
              fontWeight: 600,
              border: 0,
            }}
          >
            Link copied Successfully!
          </Alert>
        </Snackbar>

        <Snackbar
          open={displayDownloadQRSnackbar}
          autoHideDuration={6000}
          onClose={() => setDisplayDownloadQRSnackbar(false)}
        >
          <Alert
            onClose={() => setDisplayDownloadQRSnackbar(false)}
            severity="success"
            variant="outlined"
            icon={false}
            sx={{
              width: "100%",
              bgcolor: "white",
              color: "#A879FF",
              fontWeight: 600,
              border: 0,
            }}
          >
            {notificationMessage}
          </Alert>
        </Snackbar>
      </Stack>
    </motion.div>
  );
};

export default FormCard;
