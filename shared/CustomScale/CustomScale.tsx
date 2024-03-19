import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import { IconButton } from "@mui/material";

const scale = [1, 2, 3, 4, 5, 6];

const CustomScale = () => {
  const [selectedValue, setSelectedValue] = useState(0);

  const handleButtonClick = (value: number) => {
    setSelectedValue(value);

    handleClick(value);
  };

  const handleClick = (value: number | null) => {
    console.log(`Selected rating: ${value}`);
  };

  return (
    <div style={{ display: "flex" }}>
      {scale.map((value) => (
        <IconButton
          key={value}
          color={selectedValue === value ? "primary" : "error" }
          onClick={() => handleButtonClick(value)}
        >
          {value}
        </IconButton>
      ))}
    </div>
  );
};

export default CustomScale;
