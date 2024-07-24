import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false, role: "user" },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
    changeRole(state, action) {
      // yeh action hum frontend se bhej rhe haai aur initial state k role main daal rhe haain
      const role = action.payload;
      state.role = role;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
