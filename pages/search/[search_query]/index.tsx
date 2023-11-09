import React from "react";
import DummyCard from "../../../components/dummyCard";
import { TproductCard } from "../../../components/types/cardTypes";
import Product from "../../../components/product";
import ClientOnly from "../../../components/ClientOnly";
import { useRouter } from "next/router";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ContentWrapper from "../../../components/content/ContentWrapper";
import { MyPage } from "../../../components/common/types";
import GoBackButton from "../../../components/RouterComponents/GoBackButton";
import { useSearchParams } from "next/navigation";

const SearchPage: MyPage = () => {
  const router = useRouter();

  const searchProduct = router.query.search_query;
  const searchQuery = useSearchParams();

  console.log(searchQuery);

  const fetchProductBySearchParam = async () => {
    const response = await axios.get(
      `https://dummyjson.com/product/search?q=${searchProduct}`
    );

    return response.data;
  };

  const {
    status: status,
    error: error,
    data: product,
  } = useQuery({
    queryKey: ["search", searchProduct],
    queryFn: () => fetchProductBySearchParam(),
    enabled: !!searchProduct,
  });

  const renderContent = product?.products.map(
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
  {
    status === "loading" && <DummyCard cards={10} />;
  }
  {
    error && <p>{error}</p>;
  }

  return (
    <ContentWrapper>
      <GoBackButton returnFunc={router.back} />
      {product && product.products.length === 0 && (
        <p>Whoops! looks like we don't have products like this atm</p>
      )}
      <section className="h-min-full grid    grid-cols-1 gap-5   md:grid-cols-3 lg:grid-cols-4">
        <ClientOnly>{product && renderContent}</ClientOnly>
      </section>
    </ContentWrapper>
  );
};

export default SearchPage;
SearchPage.Layout = "Main";
