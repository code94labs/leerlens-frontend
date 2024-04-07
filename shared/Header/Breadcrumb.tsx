import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useRouter } from "next/router"; // Import useRouter from next/router
import { breadcrumbMap } from "../../routes/routes";

const customStyles = {
  stack: {
    border: "2px #E2E3E4 solid",
  },
  activeLink: {
    fontWeight: "bold",
  },
};

const Breadcrumb = () => {
  const router = useRouter();

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    route: string
  ) => {
    event.preventDefault();
    // router.push(route);
  };

  const pathSegments = router.asPath
    .split("/")
    .filter((segment) => segment !== "");

  const breadcrumbs = pathSegments.map((segment, index) => {
    const route = `/${pathSegments.slice(0, index + 1).join("/")}`;
    const label = breadcrumbMap[route] || segment;
    const isLast = index === pathSegments.length - 1;
    if (isLast) {
      return (
        <Typography
          key={index}
          color="text.primary"
          sx={customStyles.activeLink}
          textTransform="capitalize"
        >
          {label}
        </Typography>
      );
    } else {
      return (
        <Link
          underline="hover"
          key={index}
          color="inherit"
          href={route}
          textTransform="capitalize"
          onClick={(event) => handleClick(event, route)}
        >
          {label}
        </Link>
      );
    }
  });

  return (
    <Stack spacing={2} py={1} px={1} sx={customStyles.stack}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
};

export default Breadcrumb;
