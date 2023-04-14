import * as React from "react";
import { useDragLayer } from "react-dnd";
import { ItemTypes } from "./itemTypes";
import CardDragPreview from "./cardDragPreview";

const layerStyles = {
  position: "fixed",
  pointerEvents: "none",
  zIndex: 100,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
};

const getItemStyles = (initialOffset, currentOffset) => {
  if (!initialOffset || !currentOffset) {
    return {
      display: "none",
    };
  }
  const { x, y } = currentOffset;

  const transform = `translate(${x - 40}px, ${y - 40}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
};

const customDragLayer = () => {
  const { itemType, isDragging, item, initialOffset, currentOffset } =
    useDragLayer((monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    }));

  const renderItem = () => {
    switch (itemType) {
      case ItemTypes.BOX:
        return (
          <CardDragPreview
            category={item.category}
            price={item.price}
            title={item.title}
            thumbnail={item.thumbnail}
            brand={item.brand}
          />
        );
      default:
        return null;
    }
  };

  if (!isDragging) {
    return null;
  }

  return (
    <div style={layerStyles}>
      <div style={getItemStyles(initialOffset, currentOffset)}>
        {renderItem()}
      </div>
    </div>
  );
};
export default customDragLayer;
