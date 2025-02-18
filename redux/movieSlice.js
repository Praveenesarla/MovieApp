import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    shortlisted: [],
  },
  reducers: {
    shortlistMovie: (state, action) => {
      const isAlreadyShortlisted = state.shortlisted.some(
        (movie) => movie.imdbID === action.payload.imdbID
      );
      if (!isAlreadyShortlisted) {
        state.shortlisted = [...state.shortlisted, action.payload];
      }
    },
    removeMovie: (state, action) => {
      state.shortlisted = state.shortlisted.filter(
        (movie) => movie.imdbID !== action.payload.imdbID
      );
    },
  },
});

export const { shortlistMovie, removeMovie } = movieSlice.actions;
export default movieSlice.reducer;
