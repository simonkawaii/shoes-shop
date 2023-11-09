import axios from "axios";

// eslint-disable-next-line import/prefer-default-export
export const api = axios.create({
  baseURL: "https://dummyjson.com/products",
});

export const getProductsPage = async (pageParam = 1, options = {}) => {
  const amountOfItemsToShow = 10;
  const amountOfItemsToSkip = 10;
  const response = await api.get(
    `/?limit=10&skip=${pageParam * amountOfItemsToShow - amountOfItemsToSkip}`
  );

  return response.data;
};

export const searchProductsPage = async (
  pageParam = 1,
  query: string,
  options = {}
) => {
  const amountOfItemsToShow = 10;
  const amountOfItemsToSkip = 10;

  const response = await api.get(
    `/search?q=${query}&?limit=10&skip=${
      pageParam * amountOfItemsToShow - amountOfItemsToSkip
    }`,
    options
  );

  return response;
};
