import { createSlice } from "@reduxjs/toolkit";

type UserState = {
  user: {
    email: string;
    password: string;
  };
};

type InitialState = {
  user: UserState;
};

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const selectUser = (state: InitialState) => state.user.user;

export default userSlice.reducer;
