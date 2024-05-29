import { Checkbox, Stack, Typography } from "@mui/material";
import React from "react";
import { champBlackFontFamily } from "../../shared/typography";

type Props = {
  titles: string[];
  isMainTitle?: boolean;
  isSelectAllChecked?: boolean;
  setIsSelectAllChecked?: (value: boolean) => void;
};

const customStyles = {
  mainTitleStack: {
    border: "1px #E6E6E6 solid",
    borderRadius: 2,
    backgroundColor: "#FFFFFF",
  },
  subTitleStack: {
    border: "1px #E6E6E6 solid",
    py: 2.5,
    borderLeft: "none",
    borderRight: "none",
  },
  checkBox: {
    mr: 2,
  },
};

const DynamicListHeader = (props: Props) => {
  const { titles, isMainTitle, isSelectAllChecked, setIsSelectAllChecked } =
    props;

  const handleSelectAllItems = () => {
    setIsSelectAllChecked && setIsSelectAllChecked(!isSelectAllChecked);
  };

  return (
    <Stack
      flexDirection="row"
      alignItems="center"
      px={2}
      py={1}
      my={2}
      sx={
        isMainTitle ? customStyles.mainTitleStack : customStyles.subTitleStack
      }
    >
      {isMainTitle && (
        <Checkbox sx={customStyles.checkBox} onChange={handleSelectAllItems} />
      )}

      {titles.map((title: string, index: number) => (
        <Typography
          fontWeight={800}
          color="#4C4C4D"
          width={isMainTitle ? "10.5%" : "50%"}
          fontFamily={champBlackFontFamily}
          pr={5}
          key={index}
        >
          {title}
        </Typography>
      ))}
    </Stack>
  );
};

export default DynamicListHeader;
