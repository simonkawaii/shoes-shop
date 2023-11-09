import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const GoBackButton = ({ returnFunc }) => {
  return (
    <button
      className="relative flex w-32 items-center justify-between rounded-lg bg-white py-2 px-4  duration-300 hover:bg-[rgb(147,51,234)] hover:text-white hover:shadow-md"
      type="button"
      onClick={returnFunc}
    >
      <ArrowBackIcon className="text-md" sx={{}} />
      <span className="text-sm">go back</span>
    </button>
  );
};

export default GoBackButton;
