import { Button, Typography } from "@mui/material";
import React, { useState } from "react";

type Props = {
  text: string;
  isSelected: boolean;
};

const CustomMenuButton = (props: Props) => {
  const { text, isSelected = false } = props;
  const [isButtonSelected, setIsButtonSelected] = useState(isSelected);

  const customStyles = {
    button: {
    },
    text: {
      color: isButtonSelected ? "#1A1A1A" : "#656567",
      fontWeight: isButtonSelected ? 800 : 500,
    },
  };

  const handleClick = () => {
    setIsButtonSelected((isButtonSelected) => !isButtonSelected);
  };

  return (
    <Button sx={customStyles.button} onClick={handleClick}>
      <Typography textTransform="capitalize" sx={customStyles.text}>
        {text}
      </Typography>
    </Button>
  );
};

export default CustomMenuButton;
