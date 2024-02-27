// bookDetailsSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBookDetails = createAsyncThunk(
  "books/fetchBookDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${id}`
      );
      console.log(response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const bookDetailsSlice = createSlice({
  name: "search",
  initialState: {
    bookDetails: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.bookDetails = action.payload;
      })
      .addCase(fetchBookDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectBookDetails = (state) => state.bookDetails.bookDetails;

export default bookDetailsSlice.reducer;
