import * as React from "react";
import Card from "./card";

const product = React.forwardRef(({ title, id, image }, ref) => {
  // this ref stands for infinite scroll hook
  const content = ref ? (
    <div ref={ref}>
      <Card title={title} id={id} image={image} />
    </div>
  ) : (
    <div>
      <Card title={title} id={id} image={image} />
    </div>
  );

  return content;
});

export default product;
