import { Box, Stack } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const customStyles = {
  container: {
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  },
  image: {
    cursor: "pointer",
  },
  box: {
    width: "90%",
    maxWidth: 1250,
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    px: {
      xs: 0,
      md: 4,
    },
    py: 3,
  },
  link: {
    color: "black",
    textDecoration: "none",
  },
};

const Header = () => {
  const router = useRouter();

  return (
    <Stack sx={customStyles.container}>
      <Box sx={customStyles.box}>
        <Image
          src="/Logo.png"
          height={40}
          width={130}
          alt="logo"
          style={customStyles.image}
          onClick={() => router.replace("/")}
        />

        <Link
          href="https://remindlearning.nl/"
          style={customStyles.link}
          target="_blank"
        >
          Visit Website
        </Link>
      </Box>
    </Stack>
  );
};

export default Header;
