import React, { useState, useEffect } from "react";
import { Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const MenuCart = () => {
  const cartContainer = useSelector((state: RootState) => state.cart);
  const { cartItems } = cartContainer;

  const [openCart, setIsOpenCart] = React.useState<boolean>(false);

  //use state and use effect to avoid hydration error caused by MUI badgeContent
  const [readCart, setReadCart] = useState(0);

  useEffect(() => {
    setReadCart(cartItems.length);
  }, [cartItems.length]);

  return (
    <>
      <button
        className="hidden sm:flex"
        type="button"
        onClick={() => {
          setIsOpenCart(!openCart);
        }}
      >
        <Badge badgeContent={readCart} color="primary">
          <ShoppingCartIcon />
        </Badge>
      </button>
    </>
  );
};

export default MenuCart;
