import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import Content from "../components/content";
import CustomDragLayer from "../components/customDragLayer";
import { MyPage } from "../components/common/types";

const Home: MyPage = () => {
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
      {/* header */}
      <CustomDragLayer />

      <div className="flex-column flex">
        {/* shopping-cart-sidebar */}
        {/* content-list */}
        <Content />
      </div>

      {/* mobile cart */}
    </div>
  );
};

export default Home;
Home.Layout = "Main";
