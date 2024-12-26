import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";

// Define Property type
interface Property {
  propertyId: number;
  name: string;
  cost: number;
  address: string;
  area: number;
  areaUnit: string;
  type: string;
  details: string;
  imageUrl: string;
}

// Define initial state shape
interface PropertyState {
  properties: Property[];
  totalPages: number;
  currentPage: number;
  loading: boolean;
  error: string | null;
  selectedProperty: Property | null; 
  filters: {
    minCost: number | null;
    maxCost: number | null;
    minArea: number | null;
    maxArea: number | null;
    propertyType: string | null;
    details: string | null;
  };
}

const initialState: PropertyState = {
  properties: [],
  totalPages: 1,
  currentPage: 1,
  loading: false,
  error: null, 
  selectedProperty: null,
  filters: {
    minCost: null,
    maxCost: null,
    minArea: null,
    maxArea: null,
    propertyType: null,
    details: null,
  },
};

// Async thunk to fetch properties with pagination and filters
export const fetchProperties = createAsyncThunk(
  'properties/fetchProperties',
  async (page: number, { getState, rejectWithValue }) => {
    const state = getState() as { properties: PropertyState }; // Get the state of properties
    const filters = state.properties.filters; // Extract current filters from state

    // Construct the query string with filters and pagination parameters
    const queryParams: string[] = [];
    queryParams.push(`page=${page}`);
    if (filters.minCost !== null) queryParams.push(`minCost=${filters.minCost}`);
    if (filters.maxCost !== null) queryParams.push(`maxCost=${filters.maxCost}`);
    if (filters.minArea !== null) queryParams.push(`minArea=${filters.minArea}`);
    if (filters.maxArea !== null) queryParams.push(`maxArea=${filters.maxArea}`);
    if (filters.propertyType) queryParams.push(`propertyType=${filters.propertyType}`);
    if (filters.details) queryParams.push(`details=${filters.details}`);

    try {
      const response = await fetch(`http://localhost:8080/api/properties?${queryParams.join('&')}`);
      if (!response.ok) {
        // If the response status is not OK, reject the promise with a custom message
        throw new Error('Failed to fetch properties from the server');
      }
      const result = await response.json();

      return {
        properties: result.data,
        totalPages: result.totalPages,
        currentPage: result.currentPage,
      };
    } catch (error) {
      console.error('Error fetching properties:', error);
      return rejectWithValue('Failed to fetch properties. Please try again later.');
    }
  }
);

// Slice definition for properties
const propertySlice = createSlice({
  name: "properties",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSelectedProperty(state, action) {
        state.selectedProperty = action.payload;
      },
    // You can add other filters-related reducers here if needed
    setFilter: (state, action) => {
      const { name, value } = action.payload;
      state.filters[name] = value;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    editPropertyById: (state, action) => {
      const index = state.properties.findIndex(
        (p) => p.propertyId === action.payload.propertyId
      );
      if (index !== -1) {
        state.properties[index] = action.payload;
      }
    },
    deletePropertyById: (state, action) => {
      state.properties = state.properties.filter(
        (p) => p.propertyId !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear error on new request
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload.properties;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Set the error message when the request fails
      });
  },
});

export const { setCurrentPage, setFilter, resetFilters, setSelectedProperty , editPropertyById, deletePropertyById} = propertySlice.actions;

export default propertySlice.reducer;
