import React, { useState } from "react";
//routing
import axios from "axios";
import { useRouter } from "next/router";
import { MyPage } from "../../../components/common/types";
import { useQuery } from "@tanstack/react-query";
//components
import ImageGallery from "../../../components/image/ImageGallery";
import ContentWrapperNoSidebar from "../../../components/content/ContentWrapperNoSidebar";
import GoBackButton from "../../../components/RouterComponents/GoBackButton";
import Breadcrumbs from "../../../components/RouterComponents/Breadcrumbs";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";

import { addItemWithQuantity } from "../../../store/features/cartSlice";

const Page: MyPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [count, setCount] = useState(1);

  const { product_id } = router.query;

  const fetchProductById = async () => {
    const response = await axios
      .get(`https://dummyjson.com/product/${product_id}`)
      .then((e) => e.data)
      .catch((e) => console.log(e.toJSON()));

    return response;
  };

  const {
    status: status,
    error: error,
    data: product,
    isFetching,
  } = useQuery({
    queryKey: ["product", product_id],
    queryFn: () => fetchProductById(),
    enabled: !!product_id,
  });

  console.log(product);
  if (isFetching) return <p>loading</p>;

  return (
    product && (
      <ContentWrapperNoSidebar>
        <div className=" flex  w-full max-w-[1280px] flex-col flex-wrap  gap-2 px-4 sm:flex-row sm:gap-8 xl:px-0">
          <GoBackButton returnFunc={router.back} />
          <Breadcrumbs router={router} />
        </div>
        <section className="grid  max-w-[1280px] grid-cols-1  content-center   gap-4 sm:grid-cols-2 sm:flex-row md:grid-cols-3 [&>*]:rounded-md  [&>*]:border-[1px] [&>*]:border-grey/20 [&>*]:bg-white [&>*]:p-6  ">
          <div className="cols-span-1 md:col-span-2">
            <ImageGallery images={product.images} />
          </div>
          <div className=" col-span-1 flex  min-h-[800px] flex-col justify-evenly gap-2">
            <div>
              <div id="provider" className="[&>*]:text-sm [&>*]:uppercase">
                <p>Provided by</p>
                <span>
                  <b> {product.brand} official shop</b>
                </span>
              </div>
              <br />
              <hr />
            </div>
            <div>
              <h5 className="text-gray-400 font-bold uppercase">
                {product.category}
              </h5>
              <h5>brand: {product.brand}</h5>
              <h5>model: {product.title}</h5>
              <br />
              <hr />
            </div>
            <div>
              <h5 className="text-gray-400 font-bold uppercase">
                Description:{" "}
              </h5>
              <h5>{product.description}</h5>
              <br />
              <hr />
            </div>
            <div>
              <div className="flex items-center gap-8">
                <h5 className="text-2xl font-extrabold ">
                  $
                  {product.price?.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </h5>
              </div>
              <section className="flex  flex-wrap items-center gap-8 py-5 ">
                <p className="text-md font-semibold">
                  Available stock: {product.stock}
                </p>
                <div className="flex items-center justify-between gap-4">
                  <button
                    disabled={count <= 1}
                    onClick={() => {
                      setCount((prev) => (prev > 1 ? prev - 1 : 1));
                    }}
                    className={`
                  ${
                    count <= 1
                      ? "bg-primary-hover text-white opacity-50"
                      : "bg-white"
                  }
                  rounded-md  border-[1px] border-primary px-5 py-2 text-xl
                  text-primary duration-200
                  ${count <= 1 ? "" : " hover:bg-primary hover:text-white "}
               
                  
                  `}
                  >
                    -
                  </button>
                  <p className="flex w-[20px] items-center justify-center">
                    {count}
                  </p>
                  <button
                    disabled={count >= product.stock}
                    onClick={() => {
                      setCount((prev) =>
                        prev <= product.stock ? prev + 1 : prev
                      );
                    }}
                    className={`rounded-md 
                    ${
                      count >= product.stock
                        ? "bg-primary-hover text-white opacity-50"
                        : "bg-white"
                    }
                    border-[1px] border-primary text-primary duration-200
                  ${
                    count < product.stock
                      ? " hover:bg-primary hover:text-white "
                      : ""
                  }

                    px-5 py-2 text-xl `}
                  >
                    +
                  </button>
                </div>
              </section>
            </div>

            <section className="flex w-full items-center  justify-between">
              <button
                onClick={() => {
                  dispatch(
                    addItemWithQuantity({
                      title: product.title,
                      id: product.id,
                      quantity: count,
                    })
                  );
                }}
                className=" 
              flex
              gap-2 rounded-md border-[1px] bg-primary px-6 py-4 text-white duration-200  hover:border-primary hover:bg-white hover:text-primary"
              >
                <span>
                  add to cart &nbsp;
                  <ShoppingCartIcon />
                </span>
              </button>
              <button className="rounded-md border-[1px] border-yellow bg-yellow px-6 py-4 duration-200 hover:bg-white hover:text-yellow">
                buy now
              </button>
            </section>
          </div>
        </section>
        {status === "loading" && <p>loading...</p>}
      </ContentWrapperNoSidebar>
    )
  );
};
export default Page;

Page.Layout = "NoSidebar";
