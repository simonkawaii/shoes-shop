import React from "react";
import { MyPage } from "../components/common/types";

const errorPage: MyPage = () => {
  return (
    <div className="bg-red-500 flex h-full w-full ">
      Whoops! looks like there is no content for this page
    </div>
  );
};

export default errorPage;

errorPage.Layout = "Main";
