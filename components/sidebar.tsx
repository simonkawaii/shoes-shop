import { useDrop } from "react-dnd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { addToCart } from "../store/features/cartSlice";

export interface TcartItem {
  id: number;
  title: string;
}

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();

  const cartContainer = useSelector((state: RootState) => state.cart);
  const { cartItems } = cartContainer;

  const [open, isOpen] = useState<boolean>(true);

  const [cartList, setCartList] = useState(cartContainer);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "div",
    drop: ({ id, title }: TcartItem) => {
      addItemToCart({
        id,
        title,
      });
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addItemToCart = ({ id, title }: TcartItem): void => {
    dispatch(
      addToCart({
        id,
        title,
      })
    );
  };

  return (
    <div
      className={`flex fixed duration-300  z-10
  ${!open ? "w-44" : "lg:w-80 sm:w-64"}`}
      ref={drop}
    >
      <div className="flex flex-col items-center overflow-y-auto duration-300 relative bg-orange-400 h-screen pb-24 w-full box-border">
        {cartItems.map(({ title, cartQuantity, id }) => {
          return (
            <div key={id} className="flex flex-row gap-5">
              <h1>{title} </h1>
              <h4>{cartQuantity} </h4>
            </div>
          );
        })}
      </div>
      <button
        type="button"
        onClick={() => {
          isOpen(!open);
        }}
        className="flex translate-y-56 -right-16 h-16 w-16 bg-black"
      >
        clicc me
      </button>
    </div>
  );
};

export default Sidebar;
