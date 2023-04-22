import React, { FC, memo } from "react";
import Card from "./card";
import { TproductComponentCard } from "./types/cardTypes";

const cardDragPreview: FC<TproductComponentCard> = memo(function BoxDragPreview(
  props: TproductComponentCard
) {
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
