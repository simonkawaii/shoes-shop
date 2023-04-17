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
import { ItemTypes } from "./itemTypes";

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
  left,
  top,
}: TproductCard) {
  const { item } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
  }));

  const dispatch = useDispatch();

  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: ItemTypes.BOX,
      item: {
        title,
        price,
        id,
        left,
        top,
        thumbnail,
        brand,
      },
      collect: (watching) => ({
        isDragging: !!watching.isDragging(),
      }),
      previewOptions: {},
    }),
    []
  );
  const [loadData, setLoadData] = useState<number>(0);
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
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  const getStyles = (left, top, isDragging) => {
    const transform = `translate3d(${left}px, ${top}px, 0) `;
    return {
      transform,
      WebkitTransform: transform,
      // IE fallback: hide the real node using CSS when dragging
      // because IE will ignore our custom "empty image" drag preview.
      opacity: isDragging ? 0 : 1,
      transition: isDragging && "0s",
    };
  };

  return (
    <div
      style={getStyles(left, top, isDragging)}
      ref={preview}
      className={` 
      bg-white
      shadow-md rounded-lg  cursor-pointer duration-200  hover:scale-105 hover:shadow-xl
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
        {mobileWidth >= 768 && (
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
        )}
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
          className={`
          rounded-tl-lg rounded-tr-lg pointer-events-none object-cover h-full w-full
          
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
              {price?.toLocaleString(undefined, {
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
