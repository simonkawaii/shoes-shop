import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import Header from "./header";
const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(147,51,234)",
      contrastText: "rgb(255,255,255)",
    },
    secondary: {
      main: "#e53f71",
    },
  },
});

const layoutNoSidebar = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="max-w-[100vw] ">
      <ThemeProvider theme={theme}>
        {/* header */}
        <Header />
        {children}
      </ThemeProvider>
      {/* shopping-cart-sidebar */}
      {/* content-list */}
    </div>
  );
};

export default layoutNoSidebar;
