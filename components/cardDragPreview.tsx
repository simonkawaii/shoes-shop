import React, { FC, memo } from "react";
import Card from "./card";
import { TproductComponentCard } from "./types/cardTypes";
import { useDragDropManager } from "react-dnd";
import ItemTypes from "./itemTypes";

const cardDragPreview: FC<TproductComponentCard> = memo(function BoxDragPreview(
  props: TproductComponentCard
) {
  return (
    <div
      style={{
        WebkitTransform: "scale(80%) rotate(-5deg)",
        position: "absolute",
        minWidth: "250px",
        opacity: 1,
        zIndex: "9999",
        pointerEvents: "none",
      }}
    >
      <Card {...props} />
    </div>
  );
});

export default cardDragPreview;
