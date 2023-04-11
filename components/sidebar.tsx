import { useDrop } from "react-dnd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import styles from "../styles/Cards.module.css";
import { RootState } from "../store/store";
import {
  addToCart,
  incrementItemInCart,
  decrementItemInCart,
  removeFromCart,
  cartTotal,
} from "../store/features/cartSlice";

export interface TcartItem {
  id: number;
  title: string;
  price: number;
}

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();

  const cartContainer = useSelector((state: RootState) => state.cart);
  const { cartItems, totalAmount } = cartContainer;

  const [isDisabled, setIsDisabled] = useState(false);
  const [open, isOpen] = useState<boolean>(false);

  const [cartList, setCartList] = useState(cartContainer);
  const [totalSum, setTotalSum] = useState(0);

  const addItemToCart = ({ id, title, price }: TcartItem): void => {
    dispatch(
      addToCart({
        id,
        title,
        price,
      })
    );
  };
  console.log(cartContainer);
  console.log(totalAmount);
  React.useEffect(() => {
    dispatch(cartTotal());
  }, [cartContainer]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "div",
    drop: ({ id, title, price }: TcartItem) => {
      addItemToCart({
        id,
        title,
        price,
      });
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const carttotalCost = (): void => {
    dispatch(cartTotal());
  };

  const regularButtonStyle =
    "  bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded";

  return (
    <div
      className={` flex fixed duration-300  lg:w-80 drop-shadow-xl
      z-[9999] h-screen
  ${!open && "-translate-x-[50%]"} `}
      ref={drop}
    >
      <div className="flex flex-col items-center  duration-300 relative bg-white  pb-24 w-full box-border">
        <p className="m-5">cart</p>
        <div
          className={`flex relative flex-col items-center overflow-y-auto w-[90%] overflow-x-hidden duration-200 ${
            !open && "opacity-50"
          }`}
        >
          {cartItems.map(({ title, cartQuantity, id }) => {
            const cartItem = cartItems.findIndex((item) => item.id);
            console.log(cartItems[cartItem].cartQuantity);
            return (
              <div
                key={id}
                className={` 
      ${styles.card}
                flex   flex-col m-5 gap-2 w-[90%]  content-center items-center`}
              >
                <h1>{title} </h1>
                <div className="flex flex-row w-full">
                  <div
                    className={`w-full justify-center flex gap-3
                
             
                `}
                  >
                    <button
                      type="button"
                      className={`${regularButtonStyle}`}
                      onClick={() => {
                        dispatch(
                          decrementItemInCart({
                            title,
                            id,
                          })
                        );
                      }}
                    >
                      <RemoveIcon fontSize="small" />
                    </button>
                    <span className="flex  justify-center items-center">
                      {cartQuantity}
                    </span>
                    <button
                      type="button"
                      className={`${regularButtonStyle}`}
                      onClick={() => {
                        dispatch(
                          incrementItemInCart({
                            title,
                            id,
                          })
                        );
                      }}
                    >
                      <AddIcon fontSize="small" />
                    </button>
                    <button
                      type="button"
                      className={`${regularButtonStyle}  hover:bg-red-500 text-red-700 border-red-500`}
                      onClick={() => {
                        dispatch(
                          removeFromCart({
                            title,
                            id,
                          })
                        );
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="absolute flex items-center  bottom-14 h-20 w-full left-0 ">
          <p className="m-3 font-bold text-lg">Total: ${totalAmount}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => {
          isOpen(!open);
        }}
        className="flex justify-center items-center translate-y-56 rounded-tr-[50%] rounded-br-[50%] -right-16 h-16 w-16 p-3 bg-white"
      >
        {!open ? <p>open cart </p> : <p>close cart</p>}
      </button>
    </div>
  );
};

export default Sidebar;
