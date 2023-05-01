import React, { FC, memo } from "react";
import Card from "./card";
import { TproductComponentCard } from "./types/cardTypes";
import { useDragDropManager } from "react-dnd";
import ItemTypes from "./itemTypes";

const cardDragPreview: FC<TproductComponentCard> = memo(function BoxDragPreview(
  props: TproductComponentCard
) {
  const dragDropManager = useDragDropManager();
  const store = dragDropManager;
  console.log(store);
  return (
    <div
      style={{
        transform: "scale(80%)",
        WebkitTransform: "scale(80%)",
        position: "absolute",
        minWidth: "250px",
        opacity: 1,
        zIndex: "9999",
      }}
    >
      <Card {...props} />
    </div>
  );
});

export default cardDragPreview;
