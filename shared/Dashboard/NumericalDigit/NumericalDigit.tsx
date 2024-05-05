import { Stack, Typography } from "@mui/material";
import React from "react";
import { champBlackFontFamily } from "../../typography";

type Props = {
  title: string;
  value: number;
};

const customStyles = {
  title: {
    fontWeight: 400,
    fontFamily: champBlackFontFamily,
    fontSize: 24,
  },
  label: {
    fontSize: 50,
    fontWeight: 500,
    color: "#333333",
    my: 6,
  },
  stack: {
    border: "2px #E6E6E6 solid",
    borderRadius: 2,
    p: 3,
  },
};

const NumericalDigit = (props: Props) => {
  const { title, value } = props;

  return (
    <Stack sx={customStyles.stack} alignItems="center">
      <Typography sx={customStyles.title}> {title}</Typography>

      <Typography sx={customStyles.label}>{value}</Typography>
    </Stack>
  );
};

export default NumericalDigit;
