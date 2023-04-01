import React, { useEffect } from "react";
import { DragPreviewImage, useDrag, useDragLayer } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
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

const regularScreen = `relative bg-amber-600 overflow-hidden
flex justify-center items-center
 duration-100 hover:cursor-grab h-48 `;

const Card: React.FC = ({ title, id }: TproductCard) => {
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
  return (
    <>
      <DragPreviewImage connect={preview} />
      <div
        ref={drag}
        className={` ${regularScreen}${isDragging && "opacity-50"} `}
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
          className="absolute rounded-md right-3 top-3 z-20 h-10 w-10 bg-white bg-opacity-50 flex justify-center items-center text-red-100 hover:bg-opacity-30"
        >
          <AddOutlinedIcon color="action" />
        </button>
        <img
          className=" rounded-lg pointer-events-none object-cover"
          src="https://unsplash.it/600/300"
          alt=""
        />
      </div>
    </>
  );
};

export default Card;
