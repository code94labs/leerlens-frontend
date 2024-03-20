import React from "react";
import Image from "next/image";
import { Box, Stack, Typography } from "@mui/material";
import { champBlackFontFamily } from "../../shared/typography";

const customStyles = {
  box: {
    width: "auto",
    padding: "8px 16px",
    border: "1px #E6E6E6 solid",
    gap: "16px",
  },
  label: {
    fontWeight: 900,
    color: "#1A1A1A",
    fontSize: "13px",
    textTransform: "uppercase",
  },
};

type socialMediaComponentProps = {
  label: string;
  image: any;
};

const SocialMediaComponent = ({ label, image }: socialMediaComponentProps) => {
  return (
    <Box sx={customStyles.box} display={"flex"} alignItems={"center"}>
      <Image src={image} height={24} width={24} alt="img" />

      <Typography sx={customStyles.label} fontFamily={champBlackFontFamily}>
        {label}
      </Typography>
    </Box>
  );
};

export default SocialMediaComponent;
