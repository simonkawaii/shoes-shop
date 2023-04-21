import React, { useCallback, useRef, useState } from "react";
import DummyCard from "./dummyCard";
import useGetProductsPage from "../hooks/useGetProductsPage";
import Product from "./product";
/* eslint-disable */
export interface TproductCard {
  title: string;
  id: number;
  thumbnail: unknown;
  category: string;
  price: number;
  brand: string;
}
/* eslint-enable */
const Content: React.FC = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);

  const { isLoading, isError, error, results, hasNextPage } =
    useGetProductsPage(pageNumber);

  const observer = useRef<IntersectionObserver | null>();
  const lastPostRef = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (node: any) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          setPageNumber((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasNextPage]
  );

  const renderContent = results?.map(
    (
      { title, id, thumbnail, category, price, brand }: TproductCard,
      index: number
    ) => {
      if (results.length === index + 1) {
        return (
          <Product
            ref={lastPostRef}
            category={category}
            price={price}
            title={title}
            id={id}
            key={id}
            thumbnail={thumbnail}
            brand={brand}
          />
        );
      }
      return (
        <Product
          category={category}
          price={price}
          title={title}
          id={id}
          key={id}
          thumbnail={thumbnail}
          brand={brand}
        />
      );
    }
  );

  return (
    <section className="h-min-full m-5 grid w-full grid-cols-1 gap-5 md:ml-48 md:grid-cols-3 lg:grid-cols-4">
      {results && renderContent}
      {isLoading && <DummyCard cards={10} />}

      {isError && <p>{error}</p>}
    </section>
  );
};

export default Content;
