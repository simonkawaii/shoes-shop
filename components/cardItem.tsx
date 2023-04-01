import * as React from "react";
import Card from "./card";

const product = React.forwardRef(({ title, id }, ref) => {
  const content = ref ? (
    <div ref={ref}>
      <Card title={title} id={id} />
    </div>
  ) : (
    <div>
      <Card title={title} id={id} />
    </div>
  );

  return content;
});

export default product;
