import Link from "next/link";
import { useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import cartSlice from "../store/features/cartSlice";
import { RootState } from "../store/store";
import Logo from "./logo";

const Header: React.FC = () => {
  const cartContainer = useSelector((state: RootState) => state.cart);
  const { cartItems } = cartContainer;
  // width change state
  const [mobileWidth, setMoblieWidth] = useState<number>(0);
  // menu state
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openCart, setIsOpenCart] = useState<boolean>(false);

  useEffect(() => {
    setMoblieWidth(window.innerWidth);
    // handle width change to present correct view mobile or desktop

    const handleWindowWidthChange = (): void => {
      setMoblieWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowWidthChange);
    return () => window.removeEventListener("resize", handleWindowWidthChange);
  }, []);

  return (
    <div className="sticky  top-0 z-[9999] flex h-16 items-center justify-between bg-white p-2 shadow-md md:p-5">
      <Logo />
      {mobileWidth >= 768 && (
        <div className="relative z-50 flex w-[350px] items-center justify-center overflow-hidden rounded-[99em] border shadow">
          <form action="" className="w-[100%]">
            <input
              className=" focus:shadow-outline   w-[100%] appearance-none py-2 px-3 leading-tight text-gray-700 focus:outline-none "
              type="text"
              name=""
              id=""
              placeholder="search"
            />
          </form>
          <div className="absolute right-0   flex h-[100%] w-[50px] items-center justify-center border-l-2 ">
            <button
              type="button"
              className="h-[inherit] w-[inherit] rounded-[99em] rounded-tl-none rounded-bl-none bg-white hover:bg-[rgb(55,65,81)]/5"
            >
              <SearchIcon sx={{ color: "rgba(55, 65, 81,0.5)" }} />
            </button>
          </div>
        </div>
      )}
      <div>
        {mobileWidth >= 768 ? (
          <div className="flex gap-5 ">
            <button
              type="button"
              onClick={() => {
                setIsOpenCart(!openCart);
                setIsOpen(false);
              }}
            >
              <div className="">
                <Badge badgeContent={cartItems.length} color="primary">
                  <ShoppingCartIcon />
                </Badge>
              </div>
            </button>
            {openCart && (
              <div className="absolute  translate-y-7 -translate-x-2/4  gap-2 overflow-hidden rounded-md bg-gray-400 p-5">
                {cartItems.map(({ title, cartQuantity, id }) => {
                  return (
                    <div key={id} className="flex  gap-5">
                      <h1>{title} </h1>
                      <h4>amount:{cartQuantity} </h4>
                    </div>
                  );
                })}
              </div>
            )}
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>
        ) : (
          <div className="row-auto flex gap-5">
            <button
              type="button"
              onClick={() => {
                setIsOpenCart(!openCart);
                setIsOpen(false);
              }}
            >
              <div className="">
                <Badge badgeContent={cartItems.length} color="primary">
                  <ShoppingCartIcon />
                </Badge>
              </div>
            </button>
            {openCart && (
              <div className="absolute  translate-y-7 -translate-x-2/4  gap-2 overflow-hidden rounded-md bg-gray-400 p-5">
                {cartItems.length === 0 ? (
                  <p>The cart is empty</p>
                ) : (
                  cartItems.map(({ title, cartQuantity, id }) => {
                    return (
                      <div key={id} className="flex  gap-5">
                        <h1>{title} </h1>
                        <h4>amount:{cartQuantity} </h4>
                      </div>
                    );
                  })
                )}
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                setIsOpen(!isOpen);
                setIsOpenCart(false);
              }}
            >
              menu
            </button>

            {isOpen && (
              <ul className="absolute translate-y-7  overflow-hidden rounded-md bg-gray-400 p-5">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/about">About</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
