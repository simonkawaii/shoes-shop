import { useDrop } from "react-dnd";
import React, { useState, useEffect } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
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
import ItemTypes from "./itemTypes";

export interface TcartItem {
  id: number;
  title: string;
  price: number;
}

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();

  const cartContainer = useSelector((state: RootState) => state.cart);
  const { cartItems, totalAmount } = cartContainer;

  const [open, isOpen] = useState<boolean>(false);

  const addItemToCart = ({ id, title, price }: TcartItem): void => {
    dispatch(
      addToCart({
        id,
        title,
        price,
      })
    );
  };

  useEffect(() => {
    dispatch(cartTotal());
  }, [cartContainer]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,

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

  const regularButtonStyle =
    "  bg-transparent relative duration-200 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded";

  return (
    <div
      className={` fixed z-[90] flex   h-screen text-white drop-shadow-xl  duration-300 sm:w-[350px]      ${
        !open && "-translate-x-[50%]"
      } `}
      ref={drop}
    >
      <div
        className={`flex ${
          open ? "bg-purple-600" : "bg-purple-500"
        } relative box-border  w-full flex-col  items-center pb-24 duration-300`}
      >
        <p className=" m-5  text-[24px] font-bold">cart</p>
        <div
          className={`relative mb-[50px] flex flex-col items-center ${
            open ? "overflow-y-auto" : "overflow-y-hidden"
          } w-[90%] overflow-x-hidden duration-200 ${!open && "opacity-50"}`}
        >
          {cartItems.map(({ title, cartQuantity, id }) => {
            return (
              <div
                key={id}
                className={` ${styles.card} m-5  flex w-[90%] flex-col content-center items-center gap-2 rounded-lg bg-white p-5  text-black shadow-md`}
              >
                <h1>{title} </h1>
                <div className="flex w-full flex-row">
                  <div className={`flex w-full justify-start gap-3`}>
                    {cartQuantity >= 2 ? (
                      <button
                        type="button"
                        disabled={!open && true}
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
                    ) : (
                      <button
                        type="button"
                        className={`${regularButtonStyle}  border-red-500 text-red-700 hover:bg-red-500`}
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
                    )}
                    <span className="flex  items-center justify-center">
                      {cartQuantity}
                    </span>
                    <button
                      type="button"
                      disabled={!open && true}
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
                    {cartQuantity >= 2 && (
                      <button
                        type="button"
                        className={`${regularButtonStyle}  border-red-500 text-red-700 hover:bg-red-500`}
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
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div
          className="absolute 
          bottom-14
          left-0
      z-[9999] flex h-20  w-full items-center justify-end bg-[inherit] "
        >
          <p className="m-3 text-lg font-bold ">Total: ${totalAmount}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => {
          isOpen(!open);
        }}
        className={`flex 
      ${open ? "bg-purple-600" : "bg-purple-500"}
      h-16
        w-16 translate-y-56 -translate-x-1 items-center  justify-center overflow-hidden  rounded-tr-[50%] rounded-br-[50%] p-3 duration-200 `}
      >
        <div
          className={`flex h-[inherit] w-[inherit] items-center justify-center rounded-[inherit] p-3 drop-shadow-md duration-200 hover:scale-125 
          `}
        >
          {!open ? (
            <ArrowBackIosNewIcon
              sx={{
                transform: "rotate(180deg)",
                transition: ".2s",
              }}
            />
          ) : (
            <ArrowBackIosNewIcon
              sx={{
                transform: " translateX(-5px)",
                transition: ".2s",
              }}
            />
          )}
        </div>
      </button>
    </div>
  );
};

export default Sidebar;
