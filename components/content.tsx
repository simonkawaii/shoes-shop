"use client";

import React, { useCallback, useRef, useState } from "react";
import DummyCard from "./dummyCard";
import { TproductCard } from "./types/cardTypes";
import Product from "./product";
import ClientOnly from "./ClientOnly";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getProductsPage } from "../services/axios/axios";

const Content: React.FC = () => {
  const [hasNextPage, setHasNextPage] = useState(true);

  const { status, error, data, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["products", "infinite"],
      getNextPageParam: (lastPage, pages) => {
        return pages.length + 1;
      },
      queryFn: ({ pageParam = 1 }) => getProductsPage(pageParam),
    });

  data?.pages?.flatMap(
    ({ products }: { products: TproductCard[] | undefined }) => {
      if (products?.length < 0) setHasNextPage(false);
    }
  );

  const hookTrial = (status, hasNextPage) => {
    const observer = useRef<IntersectionObserver | null>();

    const lastPostRef = useCallback(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (node: any) => {
        if (status === "loading") return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting && hasNextPage) {
            fetchNextPage();
          }
        });
        if (node) observer.current.observe(node);
      },
      [status, hasNextPage]
    );
    return lastPostRef;
  };
  const lastPostRef = hookTrial(status, hasNextPage);
  const renderContent = data?.pages
    ?.flatMap(({ products }: { products: TproductCard[] | undefined }) => {
      if (!products) return;
      return products;
    })
    .map(
      (
        { title, id, thumbnail, category, price, brand }: TproductCard,
        index: number
      ) => {
        const owo = data?.pages.flatMap((product) => {
          return product.products;
        });
        if (owo.length === index + 1) {
          return (
            <Product
              ref={lastPostRef}
              key={id}
              category={category}
              price={price}
              title={title}
              id={id}
              thumbnail={thumbnail}
              brand={brand}
            />
          );
        }
        return (
          <Product
            id={id}
            key={id}
            category={category}
            price={price}
            title={title}
            thumbnail={thumbnail}
            brand={brand}
          />
        );
      }
    );
  return (
    <section className="h-min-full  m-5 grid   w-full grid-cols-1 justify-center gap-5 sm:grid-cols-2 md:ml-48  md:grid-cols-3 lg:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] xl:grid-cols-[repeat(5,minmax(200px,1fr))] 2xl:grid-cols-[repeat(5,minmax(200px,400px))]">
      <ClientOnly>
        {data && renderContent}
        {isFetchingNextPage && <DummyCard cards={10} />}
        {error === "error" && (
          <div className=" z-50 flex h-screen w-screen items-center justify-center bg-red-500">
            {error}
          </div>
        )}
      </ClientOnly>
    </section>
  );
};

export default Content;
