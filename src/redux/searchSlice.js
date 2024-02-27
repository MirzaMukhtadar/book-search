import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    userInput: "",
    books: [],
  },
  reducers: {
    setUserInput: (state, action) => {
      state.userInput = action.payload;
    },
    setBooks: (state, action) => {
      state.books = action.payload;
    },
  },
});

export const { setUserInput, setBooks } = searchSlice.actions;

export const selectUserInput = (state) => state.search.userInput;
export const selectBooks = (state) => state.search.books;

export default searchSlice.reducer;
