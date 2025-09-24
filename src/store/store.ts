import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import genreReducer from "./genreSlice";

export const store = configureStore({
  reducer:{
    auth: authReducer,
    genre: genreReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;