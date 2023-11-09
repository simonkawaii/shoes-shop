import React, { useRef } from "react";
import Card from "./card";
import { TproductComponentCard } from "./types/cardTypes";

const product = React.forwardRef(
  (props: TproductComponentCard, ref: React.ForwardedRef<HTMLDivElement>) => {
    // this ref stands for infinite scroll hook

    const content = ref ? (
      <div ref={ref}>
        <Card {...props} />
      </div>
    ) : (
      <div>
        <Card {...props} />
      </div>
    );

    return content;
  }
);

export default product;
