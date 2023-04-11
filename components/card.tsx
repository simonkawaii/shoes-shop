import React, { memo, useEffect, useState } from "react";
import { DragPreviewImage, useDrag, useDragLayer } from "react-dnd";
import { useDispatch, useSelector, useStore } from "react-redux";
import { getEmptyImage } from "react-dnd-html5-backend";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import axios from "axios";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import cartSlice, {
  addToCart,
  removeFromCart,
  incrementItemInCart,
} from "../store/features/cartSlice";
import { TproductCard } from "./content";

const regularScreen = `relative overflow-hidden
flex justify-center items-center
 duration-100  h-48 `;

const Card: React.FC = memo(function Card({
  title,
  id,
  thumbnail,
  category,
  price,
  brand,
}: TproductCard) {
  const { item } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
  }));
  const dispatch = useDispatch();

  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: "div",
      item: {
        title,
        price,
        id,
      },
      collect: (watching) => ({
        isDragging: !!watching.isDragging(),
      }),
    }),
    []
  );

  const [loadData, setLoadData] = useState<number>(0);

  const addItemToCart = (): void => {
    dispatch(
      addToCart({
        title,
        id,
        price,
      })
    );
  };
  useEffect(() => {
    console.log("lol");
    const dragginnn = window.addEventListener("dragstart", (e) => {
      console.log(e.target.parentElement.parentElement);
    });
    removeEventListener("dragstart", dragginnn);
  }, [isDragging]);

  return (
    <div
      ref={preview}
      className={`shadow-md rounded-lg  cursor-pointer duration-200  hover:scale-105 hover:shadow-xl
      
      `}
    >
      <div
        className={`
      flex-col 
      
      ${regularScreen} opacity-${loadData} duration-200 ${
          loadData < 0 &&
          "bg-gray-400 rounded-md animate-pulse w-74 h-52  text-transparent"
        }`}
      >
        <div
          ref={drag}
          className={`
          z-100
      
          absolute rounded-md right-3
          duration-200
           top-3
           left-3
           cursor-grab
           z-50 h-10 w-10 bg-gray-200/40
           shadow-md flex justify-center items-center
           hover:scale-110`}
        >
          <DragIndicatorIcon
            sx={{
              color: "rgba(229, 231, 235,1)",
            }}
            style={{
              filter: "drop-shadow(1px 1px 1px gray) ",
            }}
          />
        </div>
        <button
          type="button"
          onClick={addItemToCart}
          className="absolute rounded-md right-3
          duration-200
           top-3 z-20 h-10 w-10 bg-gray-200/40
           shadow-md flex justify-center items-center
           hover:scale-110
          hover:bg-purple-600
          "
        >
          <AddOutlinedIcon
            sx={{
              color: "rgba(229, 231, 235,1)",
            }}
            style={{
              filter: "drop-shadow(1px 1px 1px gray) ",
            }}
          />
        </button>

        <img
          className={`rounded-tl-lg rounded-tr-lg pointer-events-none object-cover h-full w-full
          
          `}
          src={thumbnail}
          alt={title}
          onLoad={() => {
            setLoadData(100);
          }}
        />
      </div>

      <div className="flex flex-col m-3 overflow-hidden ">
        <h3 className="truncate">category: {category}</h3>
        <p className="truncate">model: {title}</p>
        <p className="truncate">brand: {brand}</p>
        <div className="flex justify-end  m-3">
          <span className=" text-xl">
            <b>
              $
              {price.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </b>
          </span>
        </div>
      </div>
    </div>
  );
});

export default Card;
