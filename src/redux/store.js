import { configureStore } from "@reduxjs/toolkit";
import warehouseReducer from "./warehouseSlice.js";

export const store = configureStore({
  reducer: {
    warehouse: warehouseReducer,
  },
});
