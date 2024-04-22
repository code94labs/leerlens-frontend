import { Stack, Typography } from "@mui/material";
import React from "react";
import { FieldType, fieldTypeTitles } from "../../utils/enum";
import { champBlackFontFamily } from "../../shared/typography";

type Props = {
  isHeading?: boolean;
  number?: number;
  question?: string;
  answerType?: FieldType;
};

const customStyles = {
  stack: {
    border: "3px #E6E6E6 solid",
    borderRadius: 2,
  },
};

const DyanmicListItem = (props: Props) => {
  const { isHeading, number, question, answerType } = props;

  const header = (
    <Stack flexDirection="row" px={2} py={1} my={2} sx={customStyles.stack}>
      <Typography
        fontWeight={800}
        width={150}
        color="#4C4C4D"
        fontFamily={champBlackFontFamily}
        pr={5}
      >
        Recorded date
      </Typography>

      <Typography
        fontWeight={800}
        width={600}
        color="#4C4C4D"
        fontFamily={champBlackFontFamily}
      >
        Question types
      </Typography>
    </Stack>
  );

  const questionItem = (
    <>
      {/* <Stack flexDirection="row" p={2} my={1} sx={customStyles.stack}>
        {number && <Typography width={150}>{number}</Typography>}

        {question && <Typography width={600}>{question}</Typography>}

        <Typography width={200}>{fieldTypeTitles[answerType!]}</Typography>
      </Stack> */}
    </>
  );
  return <>{isHeading ? header : questionItem}</>;
};

export default DyanmicListItem;
