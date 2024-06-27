import { Stack } from "@mui/material";
import React from "react";
import FormCard from "./FormCard";
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';

const customStyles = {
  stack: {
    // width: { md: "90%" },
    maxWidth: 1200,
    mx: "auto",
    my: 4,
    gap: {
      xs: 2,
      md: 4,
    },
  },
  innerStack: {
    flexDirection: {
      sm: "column",
      md: "row",
    },
  },
};

const HomePageContent = () => {
  const { t } = useTranslation('common');
  return (
    <Stack sx={customStyles.stack}>
      <Stack flexDirection="row" sx={customStyles.innerStack}>
        <FormCard
          title={t('home.pre-intervention.title')}
          description={t('home.pre-intervention.description')}
          pagePath="/forms/pre-intervention"
        />

        <FormCard
          title={t('home.post-intervention.title')}
          description={t('home.pre-intervention.description')}
          pagePath="/forms/post-intervention"
        />
      </Stack>

      <Stack flexDirection="row" sx={customStyles.innerStack}>
        <FormCard
          title={t('home.Remind Evaluation.title')}
          description={t('home.Remind Evaluation.description')}
          pagePath="/forms/remind-evaluation"
        />

        <FormCard
          title={t('home.Teachers.title')}
          description={t('home.Teachers.description')}
          pagePath="/teachers"
        />
      </Stack>
    </Stack>
  );
};

export default HomePageContent;
