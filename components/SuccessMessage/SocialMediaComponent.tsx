import React from "react";
import Image from "next/image";
import { Box, Stack, Typography } from "@mui/material";
import { champBlackFontFamily } from "../../shared/typography";

const customStyles = {
  box: {
    width: "auto",
    paddingX: 2,
    paddingY: 1,
    border: "1px #E6E6E6 solid",
    gap: 2,
  },
  label: {
    fontWeight: 900,
    color: "#1A1A1A",
    fontSize: 13,
    textTransform: "uppercase",
  },
};

type socialMediaComponentProps = {
  label: string;
  image: any;
};

const SocialMediaComponent = ({ label, image }: socialMediaComponentProps) => {
  return (
    <Box
      sx={customStyles.box}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Image src={image} height={24} width={24} alt="img" />

      <Typography sx={customStyles.label} fontFamily={champBlackFontFamily}>
        {label}
      </Typography>
    </Box>
  );
};

export default SocialMediaComponent;
