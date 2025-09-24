import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface GenreState {
  movieGenres: Record<number, string>;
  tvGenres: Record<number, string>;
}

const initialState: GenreState = {
  movieGenres: {},
  tvGenres: {},
};

const genreSlice = createSlice({
  name: "genre",
  initialState,
  reducers: {
    setMovieGenres(state, action: PayloadAction<Record<number, string>>) {
      state.movieGenres = action.payload;
    },
    setTvGenres(state, action: PayloadAction<Record<number, string>>){
      state.tvGenres = action.payload;
    },
  },
});

export const {setMovieGenres, setTvGenres} = genreSlice.actions;
export default genreSlice.reducer;