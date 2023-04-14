import { useSelector } from "react-redux";
import React, { useCallback, useEffect, useRef, useState } from "react";
import cartSlice from "../store/features/cartSlice";
import { RootState } from "../store/store";
import Card from "./card";
import DummyCard from "./dummyCard";
import useGetProductsPage from "../hooks/useGetProductsPage";
import Product from "./product";

export interface TproductCard {
  title: string;
  id: number;
}

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
          console.log(hasNextPage);
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
    <section className="grid-cols-1 grid w-full h-min-full md:grid-cols-3 lg:grid-cols-4 gap-5 m-5 md:ml-48">
      {results && renderContent}
      {isLoading && <DummyCard cards={10} />}

      {isError && <p>{error}</p>}
    </section>
  );
};

export default Content;
