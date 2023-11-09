import { createSlice } from "@reduxjs/toolkit";

export interface TCartInitialState {
  cartItems: any[];
  totalCartQuantity: number;
  totalAmount: number;
}
const localStoargeInitial =
  typeof window !== "undefined" ? localStorage.getItem("cart") : null;

const localCart = localStoargeInitial
  ? JSON.parse(localStoargeInitial).cartItems
  : [];

const initialState: TCartInitialState = {
  cartItems: localCart,
  totalCartQuantity: 0,
  totalAmount: 0,
};
console.log(initialState);
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { cartItems } = state;

      const itemIndex = cartItems.findIndex(({ id }) => {
        return id === action.payload.id;
      });

      if (itemIndex === -1) {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        cartItems.push(tempProduct);
      } else {
        cartItems[itemIndex].cartQuantity += 1;
      }
      console.log("added to cart");
    },
    addItemWithQuantity: (state, action) => {
      const { cartItems } = state;

      const { title, id, quantity } = action.payload;

      const itemIndex = cartItems.findIndex(({ id }) => {
        return id === action.payload.id;
      });

      if (itemIndex === -1) {
        const tempProduct = {
          title,
          id,
          cartQuantity: quantity,
        };
        cartItems.push(tempProduct);
      } else {
        cartItems[itemIndex].cartQuantity += quantity;
      }
      console.log("added to cart");
    },
    removeFromCart: (state, action) => {
      const { cartItems } = state;

      const itemIndex = cartItems.findIndex(({ id }) => {
        return id === action.payload.id;
      });

      if (itemIndex !== -1) {
        cartItems.splice(itemIndex, 1);
      }
      console.log("removed from cart");
    },
    incrementItemInCart: (state, action) => {
      const { cartItems } = state;

      const itemIndex = cartItems.findIndex(({ id }) => {
        return id === action.payload.id;
      });
      if (itemIndex !== -1) {
        cartItems[itemIndex].cartQuantity += 1;
      }
    },
    decrementItemInCart: (state, action) => {
      const { cartItems } = state;

      const itemIndex = cartItems.findIndex(({ id }) => {
        return id === action.payload.id;
      });
      if (itemIndex !== -1) {
        cartItems[itemIndex].cartQuantity -= 1;
      }

      if (cartItems[itemIndex].cartQuantity <= 0) {
        cartItems.splice(itemIndex, 1);
      }
    },
    cartTotal: (state) => {
      const { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        { total: 0, quantity: 0 }
      );
      state.totalCartQuantity = quantity;
      state.totalAmount = total;

      localStorage.setItem(
        "cart",
        JSON.stringify({
          cartItems: state.cartItems,
          totalCartQuantity: quantity,
          totalAmount: total,
        })
      );
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementItemInCart,
  decrementItemInCart,
  addItemWithQuantity,
  cartTotal,
} = cartSlice.actions;

export default cartSlice.reducer;
