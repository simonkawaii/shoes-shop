/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { getProductsPage } from "../services/axios/axios";

const useGetProductsPage = (pageNumber = 1): any => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [error, setError] = useState({ message: "" });

  useEffect(() => {
    setIsError(false);
    setError({ message: "" });
    setIsLoading(true);

    const controller = new AbortController();
    const { signal } = controller;

    setTimeout(() => {
      getProductsPage(pageNumber, { signal })
        .then(({ data }) => {
          setResults((prev): any => {
            return [...new Set([...prev, ...data.products])];
          });
          setHasNextPage(data.products.length > 0);
          setIsLoading(false);
        })
        .catch((e) => {
          setIsLoading(false);
          if (signal.aborted) return;
          setIsError(true);
          setError({ message: e.message });
        });
    }, 2000);

    return () => controller.abort();
  }, [pageNumber]);

  return { isLoading, isError, error, results, hasNextPage };
};

export default useGetProductsPage;
