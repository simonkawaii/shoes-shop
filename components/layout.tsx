import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import Header from "./header";
import Sidebar from "./sidebar";
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

const layout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="max-w-[100vw] ">
      <ThemeProvider theme={theme}>
        {/* header */}
        <Sidebar />
        <Header />
        {children}
      </ThemeProvider>
      {/* shopping-cart-sidebar */}
      {/* content-list */}
    </div>
  );
};

export default layout;
