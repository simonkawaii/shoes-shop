import { createSlice } from "@reduxjs/toolkit";

export interface TCartInitialState {
  search: string;
}

const initialState: TCartInitialState = {
  search: "",
};
console.log(initialState);
export const filterSice = createSlice({
  name: "filter",
  initialState,
  reducers: {},
});

export const {} = filterSice.actions;

export default filterSice.reducer;
