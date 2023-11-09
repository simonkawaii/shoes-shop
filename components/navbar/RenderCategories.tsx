import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const fetchCategories = async () => {
  const response = await axios
    .get(`https://dummyjson.com/products/categories`)
    .then((e) => e.data)
    .catch((e) => console.log(e.toJSON()));

  return response;
};

const RenderCategories = () => {
  const { status, error, data, isFetching } = useQuery({
    queryKey: ["category"],
    queryFn: () => fetchCategories(),
  });

  console.log(data);
  const renderCategoriesContent = data?.map((e, index) => {
    return <p key={`${e}-${index}`}>{e}</p>;
  });

  return <div>{renderCategoriesContent}</div>;
};

export default RenderCategories;
