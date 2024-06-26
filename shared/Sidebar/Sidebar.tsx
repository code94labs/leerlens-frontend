import React, { useState } from "react";
import {
  Stack,
  Divider,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { customStyles } from "../../styles/admin.sidebar";
import { RoutePath, pages } from "../../routes/routes";

const logoImg = "/logo-v2.png";

const Sidebar = () => {
  const router = useRouter();
  // const [isOpen, setIsOpen] = useState(false);
  const [accordionsOpen, setAccordionsOpen] = useState<string[]>([]);

  const handleRouteNavigation = (route: RoutePath) => {
    if (route.path) {
      router.push(route.path);
    }
  };

  const handleAccordionExpansion = (routePath: string) => {
    if (accordionsOpen.includes(routePath)) {
      const tempAccordionOpenArray = accordionsOpen.filter(
        (item) => item !== routePath
      );
      setAccordionsOpen(tempAccordionOpenArray);
    } else {
      const tempAccordionOpenArray = [...accordionsOpen, routePath];
      setAccordionsOpen(tempAccordionOpenArray);
    }
  };

  const generateMenuItem = (route: RoutePath, index: number) => {
    const handleSubItemClick = (path: string | undefined) => {
      if (path) {
        router.push(path);
      }
    };

    return (
      <div key={index}>
        {route.sub ? (
          <Accordion
            expanded={accordionsOpen.includes(route.path)}
            onChange={() => handleAccordionExpansion(route.path)}
          >
            <AccordionSummary sx={customStyles.accordionSummary}>
              <Button
                sx={{
                  ...customStyles.menuItem,
                  ...(route.path &&
                    router.pathname.includes(route.path) &&
                    customStyles.activeMenuItem),
                }}
              >
                {route.iconPath && (
                  <Image
                    src={route.iconPath}
                    height={24}
                    width={24}
                    alt="icon"
                  />
                )}

                <Typography variant="subtitle2" sx={customStyles.text}>
                  {route.text}
                </Typography>
              </Button>
            </AccordionSummary>

            <AccordionDetails sx={customStyles.accordionDetails}>
              <Stack flexDirection="column" alignItems="left">
                {route.sub.map((subRoute, index: number) => (
                  <Button
                    key={index}
                    sx={{
                      ...customStyles.accordionMenuItem,
                      ...(router.pathname === subRoute.path &&
                        customStyles.activeAccordionMenuItem),
                    }}
                    onClick={() => handleSubItemClick(subRoute.path)}
                  >
                    <Typography variant="subtitle2" sx={customStyles.text}>
                      {subRoute.text}
                    </Typography>
                  </Button>
                ))}
              </Stack>
            </AccordionDetails>
          </Accordion>
        ) : (
          <Button
            sx={{
              ...customStyles.menuItem,
              ...(router.pathname === route.path &&
                customStyles.activeMenuItem),
            }}
            onClick={() => handleRouteNavigation(route)}
          >
            {route.iconPath && (
              <Image src={route.iconPath} height={24} width={24} alt="icon" />
            )}

            <Typography variant="subtitle2" sx={customStyles.text}>
              {route.text}
            </Typography>
          </Button>
        )}
      </div>
    );
  };

  return (
    <Stack sx={customStyles.stack}>
      <Stack
        sx={customStyles.logo}
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
      >
        <Image src={logoImg} width={150} height={40} alt="logo" />
      </Stack>

      <Divider sx={customStyles.dividerMain} />

      <Stack spacing={1}>
        {pages.map((item, index: number) => generateMenuItem(item, index))}
      </Stack>
    </Stack>
  );
};

export default Sidebar;
