import React, { useEffect, useState } from "react";
import { DragPreviewImage, useDrag, useDragLayer } from "react-dnd";
import { useDispatch, useSelector, useStore } from "react-redux";
import { getEmptyImage } from "react-dnd-html5-backend";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import cartSlice, {
  addToCart,
  removeFromCart,
  incrementItemInCart,
  modifyItemsInCart,
} from "../store/features/cartSlice";
import { TproductCard } from "./content";
import { RootState } from "../store/store";

import { BoxDragPreview } from "./BoxDragPreview.js";

const regularScreen = `relative overflow-hidden
flex justify-center items-center
 duration-100 hover:cursor-grab h-48 `;

const Card: React.FC = ({ title, id, image }: TproductCard) => {
  const { item } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
  }));
  const dispatch = useDispatch();

  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: "div",
      item: {
        title,
        id,
      },
      collect: (watching) => ({
        isDragging: !!watching.isDragging(),
      }),
    }),
    []
  );
  const [loadData, setLoadData] = useState<number>(0);
  console.log(image);
  return (
    <>
      <DragPreviewImage connect={preview} />
      <div
        ref={drag}
        className={` ${regularScreen}${
          isDragging && "opacity-0"
        } opacity-${loadData} duration-500 ${
          loadData < 0 &&
          "bg-gray-400 rounded-md animate-pulse w-74 h-52  text-transparent"
        }`}
      >
        <button
          type="button"
          onClick={() => {
            dispatch(
              addToCart({
                title,
                id,
              })
            );
          }}
          className="absolute rounded-md right-3 top-3 z-20 h-10 w-10 bg-white bg-opacity-50 flex justify-center items-center text-red-100 hover:bg-opacity-30
          
          
          "
        >
          <AddOutlinedIcon color="action" />
        </button>
        <img
          className=" rounded-lg pointer-events-none object-cover h-full w-full"
          src={image}
          alt={title}
          onLoad={() => {
            setLoadData(100);
          }}
        />
      </div>
    </>
  );
};

export default Card;
