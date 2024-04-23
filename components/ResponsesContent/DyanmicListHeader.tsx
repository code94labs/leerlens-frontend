import { Stack, Typography } from "@mui/material";
import React from "react";
import { champBlackFontFamily } from "../../shared/typography";

type Props = {
  title: string;
  subTitle: string;
  isMainTitle?: boolean;
};

const customStyles = {
  mainTitleStack: {
    border: "1px #E6E6E6 solid",
    borderRadius: 2,
    backgroundColor: "#FFFFFF"
  },
  subTitleStack: {
    border: "1px #E6E6E6 solid",
    py: 2.5,
    borderLeft: 'none',
    borderRight: 'none'
  }
};

const DyanmicListHeader = (props: Props) => {
  const { title, subTitle, isMainTitle } = props;

  return (
    <Stack flexDirection="row" px={2} py={1} my={2} sx={isMainTitle ? customStyles.mainTitleStack : customStyles.subTitleStack }>
      <Typography
        fontWeight={800}
        color="#4C4C4D"
        width={isMainTitle ? 150 : "50%"}
        fontFamily={champBlackFontFamily}
        pr={5}
      >
        {title}
      </Typography>

      <Typography
        fontWeight={800}
        width={isMainTitle ? 600 : "50%"}
        color="#4C4C4D"
        fontFamily={champBlackFontFamily}
      >
        {subTitle}
      </Typography>
    </Stack>
  );
};

export default DyanmicListHeader;
