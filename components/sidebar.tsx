import { useDrop } from "react-dnd";
import React, { useState, useEffect } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
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
import Link from "next/link";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import ClientOnly from "./ClientOnly";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export interface TcartItem {
  id: number;
  title: string;
  price: number;
}

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();

  const [toastOpen, setToastOpen] = React.useState(false);

  const handleClick = () => {
    setToastOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setToastOpen(false);
  };

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

  const [{ isOver, highlighted }, drop] = useDrop(() => ({
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
      highlighted: !!monitor.canDrop(),
    }),
  }));

  const regularButtonStyle = `   ${highlighted && "pointer-events-none"} 
  ${!open && "pointer-events-none"}
  flex justify-center items-center relative duration-200  font-semibold hover:text-white py-2 px-4 border hover:border-transparent rounded`;

  return (
    <ClientOnly>
      <div
        className={` fixed z-[90] 
         mt-[60px] hidden
         h-screen
        text-white drop-shadow-xl duration-300  sm:w-[350px] md:flex   ${
          highlighted && "translate-x-[0%] "
        }   ${!open && "-translate-x-[50%]"} 
    ${isOver && "cursor-copy"}`}
        ref={drop}
      >
        <div
          className={`$ flex      ${
            isOver ? "bg-green" : open ? "bg-primary" : "bg-primary-hover"
          }

        relative box-border  w-full flex-col  items-center pb-24 duration-200`}
        >
          <p
            className={` ${
              !open && "opacity-50"
            } m-5  text-[24px] font-bold duration-100
          `}
            style={{
              translate: !open ? "100% 0" : "0 0 ",
            }}
          >
            🛒 cart
          </p>
          <div
            className={`relative mb-[50px] flex flex-col items-center ${
              open ? "overflow-y-auto" : "overflow-y-hidden"
            } w-[90%] overflow-x-hidden duration-200 ${!open && "opacity-50"}
          ${highlighted && "opacity-[60%]"}
          `}
          >
            {cartItems.length === 0 && (
              <div
                className={` ${styles.card}  text-md  m-5 flex w-[90%] flex-col content-center items-center gap-2 rounded-lg p-5 font-normal  text-white `}
              >
                Looks like your cart 🛒 is empty! Start shopping and add
                products You desire!
              </div>
            )}
            {cartItems.map(({ title, cartQuantity, id }) => {
              console.log(cartItems);
              return (
                <div
                  key={id}
                  className={` ${styles.card} m-5  flex w-[90%] flex-col content-center items-center gap-2 rounded-lg bg-white p-5  text-black shadow-md`}
                >
                  <h5>{title} </h5>
                  <img
                    src=""
                    alt="lol"
                    style={{
                      width: "100%",
                      height: "70px",
                      aspectRatio: "16 / 9",
                    }}
                  />
                  <div className="flex w-full flex-row">
                    <div
                      className={` grid w-full grid-cols-10 justify-start  gap-3 `}
                    >
                      {cartQuantity >= 2 ? (
                        <button
                          type="button"
                          disabled={!open && true}
                          className={`${regularButtonStyle} col-span-3 border-primary text-primary hover:bg-primary`}
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
                          className={`${regularButtonStyle}  col-span-3 border-red  text-red  hover:bg-red `}
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
                      <span className="   flex items-center justify-center">
                        {cartQuantity}
                      </span>
                      <button
                        type="button"
                        disabled={!open && true}
                        className={`${regularButtonStyle} col-span-3 border-primary text-primary hover:bg-primary`}
                        onClick={() => {
                          handleClick();
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
                          disabled={!open && true}
                          className={`${regularButtonStyle}  col-span-3 border-[#e53f71]  text-[#e53f71]  hover:bg-[#e53f71] `}
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
          left-0 z-[9999] flex h-20  
      w-full items-center  justify-center  bg-[inherit]  text-lg font-bold"
          >
            <div
              className={`flex h-[100%] w-[100%] items-center justify-between    duration-200   ${
                highlighted && "opacity-[60%]"
              } `}
            >
              <button
                disabled={!open && true}
                type="button"
                className={`${regularButtonStyle} m-3 border-white bg-white  text-lg font-bold  text-primary hover:border-white  hover:bg-green-hover  hover:text-white `}
              >
                <Link href={"/cart"}>Go to cart!</Link>
              </button>
              <div className=" m-3 ">Total: ${totalAmount}</div>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            isOpen(!open);
          }}
          className={`flex 
      
      ${isOver ? `bg-green-hover` : open ? "bg-primary" : "bg-primary-hover"}
      
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
        <Snackbar
          open={toastOpen}
          autoHideDuration={1000}
          onClose={handleClose}
          sx={{
            transform: "translateY(-100px) translateX(300%)",
            pointerEvents: "auto",
          }}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{
              borderRadius: "8px",
              border: "2px solid white",
            }}
          >
            <span
              style={{
                filter: "drop-shadow(0 0 1px black) contrast(1.5)",
              }}
            >
              Added to cart!
            </span>
          </Alert>
        </Snackbar>
      </div>
    </ClientOnly>
  );
};

export default Sidebar;
