import { Stack, Typography } from "@mui/material";
import React from "react";
import { champBlackFontFamily } from "../../typography";

type Props = {
  title: string;
  value: number;
};

const customStyles = {
  title: {
    fontWeight: 700,
    fontSize: 16,
    color: "#1A1A1A",
    m: 4,
  },
  label: {
    fontSize: 40,
    fontWeight: 500,
    fontFamily: champBlackFontFamily,
    color: "#333333",
    my: 6,
    width: "100%",
  },
  stack: {
    border: "2px #E6E6E6 solid",
    borderRadius: 2,
    width: "100%",
    height: "100%",
    // p: 3,
  },
};

const NumericalDigit = (props: Props) => {
  const { title, value } = props;

  return (
    <Stack sx={customStyles.stack} alignItems="start">
      <Typography sx={customStyles.title}> {title}</Typography>

      <Typography
        sx={customStyles.label}
        display="flex"
        justifyContent={"center"}
      >
        {value.toFixed(1)}
      </Typography>
    </Stack>
  );
};

export default NumericalDigit;
