import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";
import bookDetailsSlice from "./bookDetailsSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    bookDetails: bookDetailsSlice,
  },
});
