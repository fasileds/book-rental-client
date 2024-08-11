import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user";
import { bookSlice } from "./books";
import bookReducer from "./books";

export const store = configureStore({
  reducer: {
    user: userSlice,
    rented: bookReducer,
  },
});
