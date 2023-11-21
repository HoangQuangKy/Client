import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  films: [],
  randomFilm: null,
  categories: [],
  genres: [],
  actors: []
};

export const filmSlice = createSlice({
  name: "films",
  initialState,
  reducers: {
    setFilms: (state, action) => {
      state.films = action.payload.films;
      state.randomFilm = action.payload.randomFilm;
    },
    setCategories: (state, action) => {
      state.categories = action.payload.categories;
    },
    setTitle: (state, action) => {
      state.genres = action.payload.genres;
      state.actors = action.payload.actors
    }
  },
});
export const { setFilms, setCategories, setTitle } = filmSlice.actions;

export default filmSlice.reducer;
