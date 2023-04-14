import * as React from "react";
import Card from "./card";

const product = React.forwardRef(
  ({ title, id, thumbnail, category, brand, price, left, top }, ref) => {
    // this ref stands for infinite scroll hook
    const content = ref ? (
      <div ref={ref}>
        <Card
          category={category}
          price={price}
          title={title}
          id={id}
          key={id}
          thumbnail={thumbnail}
          brand={brand}
        />
      </div>
    ) : (
      <div>
        <Card
          category={category}
          price={price}
          title={title}
          id={id}
          key={id}
          thumbnail={thumbnail}
          brand={brand}
        />
      </div>
    );

    return content;
  }
);

export default product;
