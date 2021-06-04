// import { createMuiTheme } from "@material-ui/core/styles";
/* The standard createMuiTheme cause errors with React.StrictMode.
As long as Material-UI is not up to date with React.StrictMode
we need to use the import below */
import { unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2196F3",
    },
    secondary: {
      main: "#E10050",
    },
    background: {
      default: "#fff",
      secondary: "#EFEFEF",
      node: "#77BCF3",
    },
    text: {
      primary: "#161616",
      secondary: "rgba(0, 0, 0, 0.36)",
    },
  },
  typography: {
    fontSize: 14,
    h1: {
      fontSize: "2rem",
    },
    h2: {
      fontSize: "1.5rem",
    },
    h3: {
      fontSize: "1.125rem",
    },
    h4: {
      fontSize: "1rem",
    },
  },
  props: {
    MuiButton: {
      color: "primary",
      variant: "contained",
    },
  },
});
