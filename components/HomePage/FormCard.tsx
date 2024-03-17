import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";

type Props = {
  title: string;
  description: string;
  qrLink: string;
  image: string;
};

const customStyles = {
  card: {
    border: "1px #E6E6E6 solid",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  },
  boxBtn: {
    width: "80%",
  },
  primaryBtn: {
    backgroundColor: "#A879FF",
    borderRadius: 2,
    textTransform: "initial",
    fontWeight: "bold",
    mr: 2,
    p: 1.3,

    ":hover": {
      backgroundColor: "#A879FF",
    },
  },
  secondaryBtn: {
    backgroundColor: "white",
    color: "#A879FF",
    border: "2px #A879FF solid",
    borderRadius: 2,
    textTransform: "initial",
    fontWeight: "bold",
    ml: 2,
    p: 1.3,

    ":hover": {
      backgroundColor: "white",
    },
  },
};

const FormCard = (props: Props) => {
  const { title, description, qrLink, image } = props;
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
          <Button variant="contained" sx={customStyles.primaryBtn} fullWidth>
            Start {title}
          </Button>

          <Button variant="contained" sx={customStyles.secondaryBtn} fullWidth>
            View QR Code
          </Button>
        </Box>
      </Stack>

      <Stack>
        <Image src={image} height={200} width={250} alt="img" />
      </Stack>
    </Stack>
  );
};

export default FormCard;
