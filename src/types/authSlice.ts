import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define initial state for authentication
interface AuthState {
  userId: string | null;
  role: string | null;
  loading: boolean;
  error: string | null;

}

const initialState: AuthState = {
  userId: localStorage.getItem('userId') || null, // Pre-populate from local storage
  role: localStorage.getItem('role') || null,
  loading: false,
  error: null,
 
};

// Create the authSlice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ userId: string; role: string;  }>) => {
      state.userId = action.payload.userId;
      state.role = action.payload.role;
      // Update local storage for persistence
      localStorage.setItem('userId', action.payload.userId);
      localStorage.setItem('role', action.payload.role);
    },
    clearUserDetails: (state) => {
      state.userId = null;
      state.role = null;
        // Clear local storage on logout
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
    },
  },
});

export const { setUser, clearUserDetails } = authSlice.actions;
export default authSlice.reducer;
