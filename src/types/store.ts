import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import filterReducer from "../types/filterSlice.ts";
import propertyReducer from "../types/propertySlice.ts";
import authReducer from '../types/authSlice.ts';

const store = configureStore({
  reducer: {
    filters: filterReducer,
    properties: propertyReducer,
    auth: authReducer,
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
