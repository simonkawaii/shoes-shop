import Link from "next/link";
import { useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
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
    <div className="flex  z-[9999] sticky shadow-md h-16 top-0 bg-white justify-between items-center p-2 md:p-5">
      <Logo />
      <div>
        <form action="">
          <input
            className="shadow appearance-none border rounded-[99em] w-[250px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
            type="text"
            name=""
            id=""
            placeholder="search"
          />
        </form>
      </div>
      <div>
        {mobileWidth >= 768 ? (
          <div className="flex gap-5">
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
              <div className="absolute  gap-2 translate-y-7  -translate-x-2/4 bg-gray-400 rounded-md p-5 overflow-hidden">
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
            <Link href="/">About</Link>
            <Link href="/">Contact</Link>
          </div>
        ) : (
          <div className="flex row-auto gap-5">
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
              <div className="absolute  gap-2 translate-y-7  -translate-x-2/4 bg-gray-400 rounded-md p-5 overflow-hidden">
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
              <ul className="absolute translate-y-7  bg-gray-400 rounded-md p-5 overflow-hidden">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/">About</Link>
                </li>
                <li>
                  <Link href="/">Contact</Link>
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
