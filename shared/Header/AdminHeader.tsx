import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import Breadcrumb from "./Breadcrumb";

const customStyles = {
  container: {
    borderBottom: "1px #E6E6E6 solid",
  },
  image: {
    cursor: "pointer",
  },
  box: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    py: 3,
    px: 1,
  },
  link: {
    color: "black",
    textDecoration: "none",
  },
  profileText: {
    color: "#A879FF",
    fontWeight: "bold",
  },
  avatar: {
    backgroundColor: "#A879FF",
  },
};

type Props = {
  title: string;
};

const username = "Nazhim Kalam";

const AdminHeader = (props: Props) => {
  const { title } = props;

  return (
    <>
      <Stack sx={customStyles.container}>
        <Box sx={customStyles.box}>
          <Typography variant="h4" fontWeight={800} ml={1}>
            {title}
          </Typography>

          <Stack direction="row" alignItems="center">
            <Avatar alt={username} src="/avatar.jpg" sx={customStyles.avatar} />

            <Typography variant="body1" sx={customStyles.profileText} pl={1}>
              {username}
            </Typography>

            <IconButton>
              <ExpandMoreIcon />
            </IconButton>
          </Stack>
        </Box>
      </Stack>

      <Breadcrumb />
    </>
  );
};

export default AdminHeader;
