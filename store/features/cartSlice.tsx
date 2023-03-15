import { createSlice } from "@reduxjs/toolkit";

export interface TState {
  cartItems: [];
  totalCartQuantity: number;
  totalAmount: number;
}

export const cartSlice = createSlice({
  name: "cart",
  initialState: { cartItems: [], totalCartQuantity: 0, totalAmount: 0 },
  reducers: {
    addToCart: (state, action) => {
      const { cartItems, totalCartQuantity, totalAmount } = state;

      const itemIndex = cartItems.findIndex((item) => {
        return item.id === action.payload.id;
      });

      if (itemIndex === -1) {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        cartItems.push(tempProduct);
      } else {
        cartItems[itemIndex].cartQuantity += 1;
      }
      console.log("added to cart");
    },
    removeFromCart: (state) => {
      console.log("removed from cart");
    },
    incrementItemInCart: (state) => {
      console.log("added the same item to cart");
    },
    decrementItemInCart: (state) => {
      console.log("removed the same item to cart");
    },
    modifyItemsInCart: (state) => {
      const { cartItems, totalCartQuantity, totalAmount } = state;

      const itemIndex = cartItems.findIndex((item) => {
        return item.id === action.payload.id;
      });
      const incrementItemInCart = () => {
        console.log("added the same item to cart");
        cartItems[itemIndex].cartQuantity += 1;
      };
      const decrementItemInCart = () => {
        console.log("removed the same item to cart");
        cartItems[itemIndex].cartQuantity -= 1;
      };
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementItemInCart,
  modifyItemsInCart,
} = cartSlice.actions;

export default cartSlice.reducer;
