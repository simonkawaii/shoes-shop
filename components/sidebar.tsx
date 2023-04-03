import { useDrop } from "react-dnd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  addToCart,
  incrementItemInCart,
  decrementItemInCart,
  removeFromCart,
} from "../store/features/cartSlice";

export interface TcartItem {
  id: number;
  title: string;
}

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();

  const cartContainer = useSelector((state: RootState) => state.cart);
  const { cartItems } = cartContainer;

  const [open, isOpen] = useState<boolean>(false);

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

  const decrementItem = ({ id, title }: TcartItem): void => {
    dispatch(
      decrementItemInCart({
        id,
        title,
      })
    );
  };

  return (
    <div
      className={`flex fixed duration-300  z-10
  ${!open ? "w-24" : "lg:w-80 sm:w-64"}`}
      ref={drop}
    >
      <div className="flex flex-col items-center overflow-y-auto duration-300 relative bg-white shadow-2xl h-screen pb-24 w-full box-border">
        <p>shopping cart</p>
        {cartItems.map(({ title, cartQuantity, id }) => {
          return (
            <div key={id} className="flex flex-col m-5 gap-2 w-[90%]">
              <h1>{title} </h1>
              <div className="flex flex-row w-full content-evenly">
                <div className="w-full">amount: </div>
                <div className="w-full">{cartQuantity}</div>
              </div>
              <div className="flex flex-row w-full gap-2 content-evenly [&>*]:w-full">
                <button
                  type="button"
                  className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                  onClick={() => {
                    dispatch(
                      incrementItemInCart({
                        title,
                        id,
                      })
                    );
                  }}
                >
                  +
                </button>
                <button
                  type="button"
                  className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                  onClick={() => {
                    dispatch(
                      decrementItemInCart({
                        title,
                        id,
                      })
                    );
                  }}
                >
                  -
                </button>
                <button
                  type="button"
                  className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                  onClick={() => {
                    dispatch(
                      removeFromCart({
                        title,
                        id,
                      })
                    );
                  }}
                >
                  X
                </button>
              </div>
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
