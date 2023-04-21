import React, { FC, memo } from "react";
import Card from "./card";
import ICardTypes from "./types/cardTypes";

const styles = {
  transform: "scale(80%)",
  WebkitTransform: "scale(80%)",
  position: "absolute",
  minWidth: "250px",
  opacity: 1,
  zIndex: 9999,
};

const cardDragPreview: FC<ICardTypes> = memo(function BoxDragPreview({
  id,
  title,
  category,
  price,
  thumbnail,
  brand,
}: ICardTypes) {
  return (
    <div style={styles}>
      <Card
        category={category}
        price={price}
        title={title}
        thumbnail={thumbnail}
        brand={brand}
      />
    </div>
  );
});

export default cardDragPreview;
