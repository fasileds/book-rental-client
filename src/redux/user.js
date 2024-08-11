import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || {},
    token: localStorage.getItem("token") || "",
    isLoggedIn: !!localStorage.getItem("token"),
    isFetching: false, // Added this to handle the fetching state
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true; // Fixed typo from `isFaching` to `isFetching`
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },
    logOut: (state) => {
      state.user = {};
      state.token = "";
      state.isLoggedIn = false;

      // Remove from localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { loginStart, loginSuccess, logOut } = userSlice.actions;

export default userSlice.reducer;
