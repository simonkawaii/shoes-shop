import { useSelector } from "react-redux";
import React, { useCallback, useEffect, useRef, useState } from "react";
import cartSlice from "../store/features/cartSlice";
import { RootState } from "../store/store";
import Card from "./card";
import useGetProductsPage from "../hooks/useGetProductsPage";
import Product from "./cardItem";
import DummyCard from "./dummyCard";

export interface TproductCard {
  title: string;
  id: number;
}

const Content: React.FC = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [offset, setOffset] = useState(1);

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
          console.log("we are near the last post!");
          console.log(hasNextPage);
          setPageNumber((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasNextPage]
  );
  console.log(isLoading, "kurwa?");

  const renderContent = results?.map(
    ({ title, id }: TproductCard, index: number) => {
      if (results.length === index + 1) {
        console.log("last item");
        return <Product ref={lastPostRef} title={title} id={id} key={id} />;
      }
      return <Product title={title} id={id} key={id} />;
    }
  );

  const cartContainer = useSelector((state: RootState) => state.cart);
  const { cartItems } = cartContainer;
  console.log(cartItems);

  return (
    <section className="grid-cols-1 grid w-full h-min-full sm:grid-cols-3 gap-5 m-5 ml-48">
      {results && renderContent}
      {isLoading && <>isloading kurwa</>}
    </section>
  );
};

export default Content;
