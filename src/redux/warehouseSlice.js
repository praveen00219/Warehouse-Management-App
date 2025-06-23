import { createSlice } from "@reduxjs/toolkit";
import warehouses from "../utils/warehouse.json";

const initialState = {
  data: warehouses,
  filters: {
    city: "",
    cluster: "",
    spaceAvailable: 0,
    searchQuery: "",
  },
};

const warehouseSlice = createSlice({
  name: "warehouse",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    updateWarehouse: (state, action) => {
      const index = state.data.findIndex((w) => w.id === action.payload.id);
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
  },
});

export const { setFilters, updateWarehouse } = warehouseSlice.actions;
export default warehouseSlice.reducer;
