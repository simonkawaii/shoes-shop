import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from "./features/cartSlice";
import filterSliceReducer from "./features/filterSlice";

export const store = configureStore({
  reducer: {
    cart: cartSliceReducer,
    filters: filterSliceReducer,
  },
});

// export const nextWrapper = createWrapper(store)
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
