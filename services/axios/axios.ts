import axios from "axios";

// eslint-disable-next-line import/prefer-default-export
export const api = axios.create({
  baseURL: "https://dummyjson.com/products",
});

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getProductsPage = async (pageParam = 1, options = {}) => {
  const amountOfItemsToShow = 10;

  const response = await api.get(
    `/?limit=10&skip=${pageParam * amountOfItemsToShow - amountOfItemsToShow}`,
    options
  );
  console.log(response.data.products);
  console.log(pageParam);
  return response.data;
};
