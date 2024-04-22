import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Button from "@mui/material/Button";
import { Box, IconButton, Stack, Typography } from "@mui/material";

import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

const customStyles = {
  icon: {
    color: "#1A1A1A",
  },
};

const ResponseAccordion = () => {
  return (
    <Accordion>
      <AccordionSummary sx={{ backgroundColor: "whitesmoke" }}>
        <Typography sx={{ width: 200 }}>2024/02/22</Typography>

        <Typography sx={{ flex: 1 }}>Pre-Intervention</Typography>

        <Box>
          <IconButton>
            <KeyboardArrowDownRoundedIcon sx={customStyles.icon} />
          </IconButton>

          <IconButton>
            <BorderColorRoundedIcon sx={customStyles.icon} />
          </IconButton>

          <IconButton>
            <DeleteOutlinedIcon sx={customStyles.icon} />
          </IconButton>
        </Box>
      </AccordionSummary>

      <AccordionDetails>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        malesuada lacus ex, sit amet blandit leo lobortis eget.
      </AccordionDetails>

      <AccordionActions>
        <Button>Cancel</Button>

        <Button>Agree</Button>
      </AccordionActions>
    </Accordion>
  );
};

export default ResponseAccordion;
