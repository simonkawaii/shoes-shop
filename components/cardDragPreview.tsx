import React, { memo } from "react";
import Card from "./card";

const cardDragPreview: React.FC = memo(function BoxDragPreview() {
  return (
    <div className="rotate-45">
      <Card />;
    </div>
  );
});

export default cardDragPreview;
