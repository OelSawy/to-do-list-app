"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "'Poppins', sans-serif",
          backgroundColor: "var(--confirm-form)",
        },
      }
    },
    MuiTextField: {
      defaultProps: {
        variant: "standard",
      },
      styleOverrides: {
        root: {
          height: "56px",
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          fontFamily: "'Poppins', sans-serif",
          fontSize: "1.5rem",
        },
        underline: {
          "&:before": {
            borderBottom: "1px solid var(--text-not-selected)",
          },
          "&:hover:not(.Mui-disabled):before": {
            borderBottom: "1px solid var(--text-selected)",
          },
          "&:after": {
            borderBottom: "1px solid var(--confirm-form)",
          },
        },
      },
    },
  },
});

export default theme;
