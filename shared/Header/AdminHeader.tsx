import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import Breadcrumb from "./Breadcrumb";
import { clearUser, selectUser } from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useRouter } from "next/router";

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
  menuItem: {
    py: 2,

    "> .MuiSvgIcon-root": {
      pr: 1,
    },

    ":hover": {
      backgroundColor: "rgba(168, 121, 255, 0.2)",

      "> .MuiSvgIcon-root": {
        color: "#A879FF",
      },
    },
  },
};

type Props = {
  title: string;
};

const AdminHeader = (props: Props) => {
  const { title } = props;

  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(clearUser());

    router.replace('/admin/login')

    handleClose();
  }

  return (
    <>
      <Stack sx={customStyles.container}>
        <Box sx={customStyles.box}>
          <Typography variant="h4" fontWeight={800} ml={1}>
            {title}
          </Typography>

          <Stack direction="row" alignItems="center">
            <Avatar
              alt={user?.firstname}
              src="/avatar.jpg"
              sx={customStyles.avatar}
            />

            <Typography variant="body1" sx={customStyles.profileText} pl={1}>
              {user?.firstname}
            </Typography>

            <IconButton onClick={handleClick}>
              <ExpandMoreIcon />
            </IconButton>

            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem onClick={handleClose}>
                <Stack flexDirection="row">
                  <Box pr={5}>
                    <Typography variant="h6" fontWeight={800} color="#A879FF">
                      {user?.firstname}
                    </Typography>

                    <Typography variant="subtitle2">{user?.email}</Typography>
                  </Box>

                  <Box>
                    <Avatar
                      alt={user?.firstname}
                      src="/avatar.jpg"
                      sx={customStyles.avatar}
                    />
                  </Box>
                </Stack>
              </MenuItem>

              <MenuItem onClick={handleClose} sx={customStyles.menuItem}>
                <PersonOutlineOutlinedIcon />

                <Typography variant="subtitle2">My Profile</Typography>
              </MenuItem>

              <MenuItem onClick={handleLogout} sx={customStyles.menuItem}>
                <LogoutOutlinedIcon />

                <Typography variant="subtitle2">Logout</Typography>
              </MenuItem>
            </Menu>
          </Stack>
        </Box>
      </Stack>

      <Breadcrumb />
    </>
  );
};

export default AdminHeader;
