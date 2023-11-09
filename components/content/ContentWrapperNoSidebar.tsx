import React from "react";

const ContentWrapperNoSidebar = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="w-[min(100%  - 3rem, 65ch)] mt-4 flex min-h-screen  flex-col items-center gap-4    ">
      {children}
    </div>
  );
};

export default ContentWrapperNoSidebar;
