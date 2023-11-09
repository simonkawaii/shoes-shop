import React from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import ButtonTypes from "./buttonTypes";

const button = ({
  buttonType,
  addme = () => {},
  drag = () => {},
}: {
  buttonType: string;
  addme: () => void;
  drag: () => void;
}) => {
  const renderItem = () => {
    switch (buttonType) {
      case ButtonTypes.add:
        return (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              addme();
            }}
            className="border-1 bg-gray-200/40 hover:bg-purple-600 absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-md border-[rgb(0,0,0)]/20 shadow-md duration-200 hover:scale-110 "
          >
            <AddOutlinedIcon
              sx={{
                color: "rgba(229, 231, 235,1)",
              }}
              style={{
                filter: "drop-shadow(0px 0px 1px black) contrast(1.5)",
              }}
            />
          </button>
        );

      case ButtonTypes.drag:
        return (
          <div
            ref={drag}
            className={` z-100 
                 border-1 bg-gray-200/50  absolute right-3 top-3 left-3 z-50 flex h-10 w-10 cursor-grab items-center justify-center rounded-md border-[rgb(0,0,0)]/20 shadow-md duration-200 hover:scale-110`}
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <DragIndicatorIcon
              sx={{
                color: "rgba(229, 231, 235,1)",
              }}
              style={{
                filter: "drop-shadow(0px 0px 1px black) contrast(1.5)",
              }}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return <>{renderItem()}</>;
};

export default button;
