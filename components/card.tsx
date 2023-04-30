/* eslint-disable @typescript-eslint/no-shadow */
import React, { FC, memo, useEffect, useState } from "react";
import { useDrag, useDragLayer } from "react-dnd";
import { useDispatch } from "react-redux";
import { getEmptyImage } from "react-dnd-html5-backend";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { addToCart } from "../store/features/cartSlice";
import { TproductComponentCard } from "./types/cardTypes";
import ItemTypes from "./itemTypes";

const regularScreen = `relative overflow-hidden flex justify-center items-center duration-100  h-48 `;

const Card: FC<TproductComponentCard> = memo(function Card({
  title,
  id,
  thumbnail,
  category,
  price,
  brand,
  left,
  top,
}: TproductComponentCard) {
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
  useEffect(() => {}, []);

  const getStyles = (
    left: number,
    top: number,
    isDragging: unknown
  ): {
    transform: string;
    WebkitTransform: string;
    opacity: number;
    transition: string;
  } => {
    const transform = `translate3d(${left}px, ${top}px, 0) scale()`;
    return {
      transform,
      WebkitTransform: transform,
      // IE fallback: hide the real node using CSS when dragging
      // because IE will ignore our custom "empty image" drag preview.
      opacity: isDragging ? 0 : 1,
      transition: isDragging ? "0s" : ".2s",
    };
  };

  const { transform, WebkitTransform, opacity, transition } = getStyles(
    left,
    top,
    isDragging
  );

  return (
    <div
      style={{
        transform: transform,
        WebkitTransform: WebkitTransform,
        opacity: opacity,
        transition: transition,
      }}
      ref={preview}
      className={`cursor-pointer rounded-lg  bg-white shadow-md  duration-200 hover:scale-105 hover:shadow-xl`}
    >
      <div
        className={`  flex-col     ${regularScreen} opacity-${loadData} duration-200 ${
          loadData < 0 &&
          "w-74 h-52 animate-pulse rounded-md bg-gray-400  text-transparent"
        }`}
      >
        {mobileWidth >= 768 && (
          <div
            ref={drag}
            className={` z-100 border-1 absolute right-3 top-3 left-3 z-50 flex h-10 w-10 cursor-grab items-center justify-center rounded-md border-[rgb(0,0,0)]/20 bg-gray-200/50 shadow-md duration-200 hover:scale-110`}
          >
            <DragIndicatorIcon
              sx={{
                color: "rgba(229, 231, 235,1)",
              }}
              style={{
                filter: "drop-shadow(0px 0px 1px black) ",
              }}
            />
          </div>
        )}
        <button
          type="button"
          onClick={addItemToCart}
          className="border-1 absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-md border-[rgb(0,0,0)]/20 bg-gray-200/40 shadow-md duration-200 hover:scale-110 hover:bg-purple-600 "
        >
          <AddOutlinedIcon
            sx={{
              color: "rgba(229, 231, 235,1)",
            }}
            style={{
              filter: "drop-shadow(0px 0px 1px black) ",
            }}
          />
        </button>

        <img
          className={`  pointer-events-none h-full w-full rounded-tl-lg rounded-tr-lg object-cover     `}
          src={thumbnail}
          alt={title}
          onLoad={() => {
            setLoadData(100);
          }}
        />
      </div>

      <div className="m-3 flex flex-col overflow-hidden ">
        <h3 className="truncate">category: {category}</h3>
        <p className="truncate">model: {title}</p>
        <p className="truncate">brand: {brand}</p>
        <div className="m-3 flex  justify-end">
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
