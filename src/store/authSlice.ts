import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: null | {
    uid: string;
    email: string | null;
    token?: string;
    displayName: string | null;
    photoURL?: string | null;
  };
}

const initialState: AuthState = { user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState["user"]>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    updateProfile: (
      state,
      action: PayloadAction<{ displayName?: string; photoURL?: string }>
    ) => {
      if (state.user) {
        if (action.payload.displayName)
          state.user.displayName = action.payload.displayName;
        if (action.payload.photoURL)
          state.user.photoURL = action.payload.photoURL;
      }
    },
  },
});

export const { setUser, clearUser, updateProfile } = authSlice.actions;
export default authSlice.reducer;
