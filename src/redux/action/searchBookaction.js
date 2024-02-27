import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setBooks } from "../searchSlice";

export const searchBooks = createAsyncThunk(
  "search/searchBooks",
  async (userInput, { rejectWithValue, dispatch }) => {
    const apikey = "AIzaSyAVtgEeiyFZNogQV7_llgbktpDBmsL2VMY";
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${userInput}&key=${apikey}&maxResults=40`
      );
      const books = response.data.items;
      dispatch(setBooks(books)); // Dispatch setBooks action with the fetched books
      return books;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
