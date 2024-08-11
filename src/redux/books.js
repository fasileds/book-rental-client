import { createSlice } from "@reduxjs/toolkit";

export const bookSlice = createSlice({
  name: "rented",
  initialState: {
    book: [],
  },
  reducers: {
    addBooks: (state, action) => {
      state.book.push(action.payload);
    },
  },
});

// Exporting the action
export const { addBooks } = bookSlice.actions;

// Exporting the reducer
export default bookSlice.reducer;
