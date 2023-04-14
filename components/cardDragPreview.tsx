import React, { memo } from "react";
import Card from "./card";

const styles = {
  transform: "scale(80%)",
  WebkitTransform: "scale(80%)",
  position: "absolute",
  minWidth: "250px",
  opacity: 1,
  zIndex: 9999,
};

const cardDragPreview: React.FC = memo(function BoxDragPreview({
  title,
  category,
  price,
  thumbnail,
  brand,
}) {
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
