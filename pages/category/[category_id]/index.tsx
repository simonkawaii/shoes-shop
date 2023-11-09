import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { MyPage } from "../../../components/common/types";
import { useQuery } from "@tanstack/react-query";
import GoBackButton from "../../../components/RouterComponents/GoBackButton";
import ContentWrapper from "../../../components/content/ContentWrapper";
import ClientOnly from "../../../components/ClientOnly";
import DummyCard from "../../../components/dummyCard";
import Product from "../../../components/product";
import { TproductCard } from "../../../components/types/cardTypes";
const Page: MyPage = () => {
  const router = useRouter();

  const { category_id } = router.query;

  console.log(category_id);

  const fetchCategory = async () => {
    const response = await axios
      .get(`https://dummyjson.com/products/category/${category_id}`)
      .then((e) => e.data)
      .catch((e) => console.log(e.toJSON()));

    return response;
  };

  const {
    status: status,
    error: error,
    data: category,
    isFetching,
  } = useQuery({
    queryKey: ["category", category_id],
    queryFn: () => fetchCategory(),
    enabled: !!category_id,
  });
  console.log(category);
  if (isFetching) return <p>loading</p>;

  const renderContent = category?.products.map(
    ({ title, id, thumbnail, category, price, brand }: TproductCard) => {
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
    <ContentWrapper>
      <GoBackButton returnFunc={router.back} />
      {category && category.products.length === 0 && (
        <p>Whoops! looks like we don't have products like this atm</p>
      )}
      {status === "loading" && <DummyCard cards={10} />}
      <section className="h-min-full grid    grid-cols-1 gap-5   md:grid-cols-3 lg:grid-cols-4">
        <ClientOnly>{category && renderContent}</ClientOnly>
      </section>
    </ContentWrapper>
  );
};

export default Page;
Page.Layout = "Main";
