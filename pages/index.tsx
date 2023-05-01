import type { NextPage } from "next";
import Head from "next/head";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Image from "next/image";
import { useEffect, useState } from "react";
import Content from "../components/content";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import CustomDragLayer from "../components/customDragLayer";

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

const Home: NextPage = () => {
  const [mobileWidth, setMoblieWidth] = useState<number>(0);

  useEffect(() => {
    setMoblieWidth(window.innerWidth);
    // handle width change to present correct view mobile or desktop
    const handleWindowWidthChange = (): void => {
      setMoblieWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleWindowWidthChange);
    return () => window.removeEventListener("resize", handleWindowWidthChange);
  }, []);

  return (
    <div className="flex min-h-[110vh] flex-col">
      <ThemeProvider theme={theme}>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {/* header */}
        <CustomDragLayer />

        <Header />
        <div className="flex-column flex">
          {/* shopping-cart-sidebar */}
          {mobileWidth > 768 && <Sidebar />}
          {/* content-list */}
          <Content />
        </div>

        {/* mobile cart */}
      </ThemeProvider>
    </div>
  );
};

export default Home;
