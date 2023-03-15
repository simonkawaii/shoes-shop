import React, { useEffect } from "react";
import { useDrag } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { getEmptyImage } from "react-dnd-html5-backend";
import cartSlice, {
  addToCart,
  removeFromCart,
  incrementItemInCart,
  modifyItemsInCart,
} from "../store/features/cartSlice";
import { TproductCard } from "./content";
import { RootState } from "../store/store";

const Card: React.FC = ({ title, id }) => {
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

  useEffect(() => {}, []);
  return (
    <div
      ref={drag}
      className={`relative bg-amber-600 flex justify-center items-center duration-100 hover:cursor-grab h-48  ${
        isDragging && "opacity-100"
      } `}
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
        className="absolute right-2 top-2 z-20 h-5 w-5 bg-blue-600 flex justify-center items-center text-red-100"
      >
        +
      </button>
      <h1>
        {title}
        <img
          className="rounded-lg pointer-events-none object-cover"
          src="https://unsplash.it/600/300"
          alt=""
        />
      </h1>
    </div>
  );
};

export default Card;
