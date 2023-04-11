import React, { memo } from "react";
import Card from "./card";

const styles = {
  display: "inline-block",
  transform: "rotate(-47deg)",
  WebkitTransform: "rotate(-47deg)",
};

const cardDragPreview: React.FC = memo(function BoxDragPreview() {
  return (
    <div style={styles}>
      <Card />;
    </div>
  );
});

export default cardDragPreview;
