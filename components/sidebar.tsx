import React, { useEffect, useState } from "react";
import scrollbar from "../styles/index.module.css";
import { useDrop } from "react-dnd";
import { RootState } from "../store/store";
import {
  addToCart,
  removeFromCart,
  incrementItemInCart,
  modifyItemsInCart,
} from "../store/features/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = () => {
  const dispatch = useDispatch();

  const cartContainer = useSelector((state: RootState) => state.cart);
  const { cartItems } = cartContainer;

  const [open, isOpen] = useState(true);

  const [cartList, setCartList] = useState(cartContainer);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "div",
    drop: (item) => {
      addItemToCart({ id: item.id, title: item.title });
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addItemToCart = (item) => {
    dispatch(addToCart({ id: item.id, title: item?.title }));
  };
  console.log(cartItems);
  return (
    <div
      className={`flex relative duration-300 
  ${!open ? "w-14" : "lg:w-80 sm:w-64"}`}
      ref={drop}
    >
      <div
        className={`flex flex-col items-center overflow-y-auto duration-300 relative bg-orange-400 h-screen pb-24 w-full box-border`}
      >
        <>
          {cartItems.map((e, index) => {
            return (
              <div key={index} className={'flex flex-row gap-5'}>
                <h1>{e.title} </h1>
                <h4>{e.cartQuantity} </h4>
              </div>
            );
          })}
        </>
      </div>
      <button
        onClick={() => {
          isOpen(!open);
        }}
        className={"flex top-24 -right-16 absolute h-16 w-16 bg-black"}
      >
        clicc me
      </button>
    </div>
  );
};

export default Sidebar;
