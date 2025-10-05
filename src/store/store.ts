import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import genreReducer from "./genreSlice";
import bookmarkReducer from "./bookmarkSlice";
import loadingReducer from './loadingSlice'

export const store = configureStore({
  reducer:{
    auth: authReducer,
    genre: genreReducer,
    bookmarks: bookmarkReducer,
    loading: loadingReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;