import React from "react";

const ContentWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="m-0 flex flex-col md:m-5 md:ml-48 [&>*]:m-5">
      {children}
    </div>
  );
};

export default ContentWrapper;
