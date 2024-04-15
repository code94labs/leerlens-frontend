export const customStyles = {
  stack: {
    minWidth: 250,
    height: "100vh",
    backgroundColor: "#333333",
    position: "sticky",
    top: 0,
    m: 0,
  },
  logo: {
    backgroundColor: "#333333",
    textAlign: "center",
    height: 40,
    p: 2,
  },
  menuItem: {
    padding: "12px 20px",
    textTransform: "initial",
    justifyContent: "flex-start",
    transition: "background-color 0.3s ease, color 0.3s ease",
    color: "#E6E6E6",
    backgroundColor: "#333333",
    width: "100%",
    "&:hover": {
      backgroundColor: "#A879FF",
      "*": {
        color: "white",
      },
    },
  },
  dividerMain: {
    margin: "10px 0",
    borderColor: "#E6E6E6",
  },
  divider: {
    margin: "10px 0",
  },
  text: {
    color: "#858481",
    fontWeight: "500",
    marginLeft: 1.5,
  },
  icon: {
    color: "#858481",
  },
  accordionMenuItem: {
    textTransform: "initial",
    justifyContent: "flex-start",
    py: 1.5,
    width: "100%",

    "&:hover": {
      borderLeft: "8px #A879FF solid",
      borderRadius: 0,
    },
  },
  accordionDetails: {
    backgroundColor: "#333333",
  },
  activeMenuItem: {
    backgroundColor: "#A879FF",
    "*": {
      color: "white !important",
    },
  },
  activeAccordionMenuItem: {
    borderLeft: "8px #A879FF solid",
    borderRadius: 0,
    "> .MuiTypography-root": {
      color: "white",
    },
  },
  accordionSummary: {
    color: "#E6E6E6",
    backgroundColor: "#333333",
    p: 0,
    boxShadow: "none",
    border: "none",
    outline: "none",
  },
};
