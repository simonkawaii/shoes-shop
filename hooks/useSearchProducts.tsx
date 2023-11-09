import { useState, useEffect } from "react";
import { searchProductsPage } from "../services/axios/axios";

const useGetProductsPage = (pageNumber = 1, query: string) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsError(false);
    setError("");
    setIsLoading(true);

    const controller = new AbortController();
    const { signal } = controller;
    setTimeout(() => {
      searchProductsPage(pageNumber, query, { signal })
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
          setError(e.message);
        });
    }, 300);

    return () => controller.abort();
  }, [pageNumber]);

  return { isLoading, isError, error, results, hasNextPage };
};

export default useGetProductsPage;
