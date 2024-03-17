import { Box, Stack } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const customStyles = {
  container: {
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  },
  box: {
    width: "90%",
    maxWidth: 1250,
    margin: "0 auto",
  },
  link: {
    color: "black",
    textDecoration: "none",
  },
};

const Header = () => {
  return (
    <Stack sx={customStyles.container}>
      <Box
        sx={customStyles.box}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        px={4}
        py={3}
      >
        <Image src="/Logo.png" height={40} width={130} alt="logo" />

        <Link href="https://remindlearning.nl/" style={customStyles.link}>
          Visit Website
        </Link>
      </Box>
    </Stack>
  );
};

export default Header;
