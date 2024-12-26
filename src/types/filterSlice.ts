import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  minCost: string;
  maxCost: string;
  minArea: string;
  maxArea: string;
  propertyType: string;
  details: string;
}

const initialState: FilterState = {
    minCost: "0",
    maxCost: "5000000", // Default max cost
    minArea: "0",
    maxArea: "2000", // Default max area
    propertyType: "",
    details: "",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<{ name: string; value: string }>) => {
      state[action.payload.name as keyof FilterState] = action.payload.value;
    },
    resetFilters: () => initialState,
  },
});

export const { setFilter, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
