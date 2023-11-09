import React, { useEffect } from "react";
import { useRouter } from "next/router";

const index = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/");
  }, []);

  return <div>index</div>;
};

export default index;
index.Layout = "Main";
