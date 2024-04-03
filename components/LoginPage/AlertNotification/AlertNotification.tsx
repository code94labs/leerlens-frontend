import { Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

type Props = {
  message: string;
  linkText: string;
  onClick?: () => void;
};

const customStyles = {
  stack: {
    backgroundColor: "#FCEBEA",
    borderLeft: "10px #DF332B solid",
  },
  link: {
    textDecorationColor: "#DF332B",
  },
};

const AlertNotification = (props: Props) => {
  const { message, linkText, onClick } = props;

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Stack
      flexDirection="row"
      justifyContent="space-between"
      px={3}
      py={1.5}
      my={2}
      sx={customStyles.stack}
    >
      <Typography variant="subtitle2">{message}</Typography>

      <Link href="#" passHref style={customStyles.link}>
        <Typography variant="subtitle2" onClick={handleClick} color="#DF332B">
          {linkText}
        </Typography>
      </Link>
    </Stack>
  );
};

export default AlertNotification;
