import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import filterReducer from "../types/filterSlice.ts";
import propertyReducer from "../types/propertySlice.ts";

const store = configureStore({
  reducer: {
    filters: filterReducer,
    properties: propertyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Define a type for asynchronous thunks
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
