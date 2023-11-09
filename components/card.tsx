/* eslint-disable @typescript-eslint/no-shadow */
import React, { FC, memo, useEffect, useState } from "react";
import { useDrag, useDragLayer } from "react-dnd";
import { useDispatch } from "react-redux";
import { getEmptyImage } from "react-dnd-html5-backend";

import { addToCart } from "../store/features/cartSlice";
import { TproductComponentCard } from "./types/cardTypes";
import ItemTypes from "./itemTypes";
import Link from "next/link";
import axios from "axios";
import Button from "./card/button";

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
  const addItemToCart = (): void => {
    dispatch(
      addToCart({
        title,
        id,
        price,
      })
    );
  };

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
        draa: !!watching.isDragging(),
      }),
      previewOptions: {},
    }),
    []
  );
  const [loadData, setLoadData] = useState<number>(0);
  const [mobileWidth, setMoblieWidth] = useState<number>(0);

  useEffect(() => {
    if (!thumbnail) {
      console.log("lol");
    }
  }, [thumbnail]);

  useEffect(() => {
    setMoblieWidth(window.innerWidth);
    // handle width change to present correct view mobile or desktop

    const handleWindowWidthChange = (): void => {
      setMoblieWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowWidthChange);
    return () => window.removeEventListener("resize", handleWindowWidthChange);
  }, []);
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  const getStyles = (
    left: number,
    top: number,
    isDragging: any
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
  const { ...stylesFromGetStyles } = getStyles(left, top, isDragging);
  return (
    <Link
      href={{
        pathname: `/products/${id}`,
      }}
      className={`${isDragging && "pointer-events-none"}`}
    >
      <div
        style={stylesFromGetStyles}
        ref={preview}
        onClick={(e) => {
          if (isDragging) e.preventDefault();
        }}
        className={`cursor-pointer rounded-lg 
         bg-white shadow-md  duration-200  hover:shadow-xl
         
         `}
      >
        <div
          className={`  flex-col     ${regularScreen} opacity-${loadData} duration-200 ${
            loadData < 0 &&
            "w-74 bg-gray-400 text-transparent h-52 animate-pulse  rounded-md"
          }
          `}
        >
          {mobileWidth >= 768 && <Button buttonType="drag" drag={drag} />}
          <Button buttonType="add" addme={addItemToCart} />
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
          <h4 className="truncate  font-bold">{title}</h4>

          <h5 className="text-gray-400  truncate font-semibold">
            category: {category}
          </h5>
          <br />
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
    </Link>
  );
});

export default Card;
