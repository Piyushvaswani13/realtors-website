import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define Property type
interface Property {
  propertyId: number;
  name: string;
  address: string;
  details: string;
  cost: number;
  area: number;
  areaUnit: string;
  type: string;
  pincode: string;
  city: string;
  state: string;
  country: string;
  locality: string;
  imageUrl: string;
}

interface Filters {
  city?: string;
  state?: string;
  locality?: string;
  country?: string;
  pincode?: string;
  minCost: number | null;
  maxCost: number | null;
  minArea: number | null;
  maxArea: number | null;
  propertyType: string | null;
  details: string | null;
}

interface PropertyState {
  properties: Property[];
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  selectedProperty: Property | null;
  filters: Filters;
}

const initialState: PropertyState = {
  properties: [],
  currentPage: 1,
  totalPages: 1,
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
// export const fetchProperties = createAsyncThunk(
//   'properties/fetchProperties',
//   async (page: any[], { getState, rejectWithValue }) => {
//     const state = getState() as { properties: PropertyState }; // Get the state of properties
//     const filters = state.properties.filters; // Extract current filters from state

//     // Debugging: log `page` and `filters` to check their types and values
//     console.log('Page:', page, 'Type:', typeof page);

//     // Extract property IDs from the `page` array
//     const propertyIds = page.map((property) => property.propertyId);
//     console.log('Property IDs:', propertyIds); // Debugging: check extracted IDs

//     // Construct the query string with filters and pagination parameters
//     const queryParams: string[] = [];

//     // Add property IDs to the query string
//     if (propertyIds.length > 0) {
//       queryParams.push(`propertyIds=${propertyIds.join(',')}`);
//     }

//     // Helper function to validate and add query parameters
//     const addQueryParam = (key: string, value: any) => {
//       if (
//         value !== null &&
//         value !== undefined &&
//         (typeof value === 'string' || typeof value === 'number')
//       ) {
//         queryParams.push(`${key}=${encodeURIComponent(value)}`);
//       } else if (typeof value === 'object') {
//         console.warn(`Invalid value for key '${key}':`, value);
//       }
//     };

//     // Add filters to the query parameters
//     addQueryParam('minCost', filters.minCost);
//     addQueryParam('maxCost', filters.maxCost);
//     addQueryParam('minArea', filters.minArea);
//     addQueryParam('maxArea', filters.maxArea);
//     addQueryParam('propertyType', filters.propertyType);
//     addQueryParam('details', filters.details);

//     // Location filters
//     addQueryParam('city', filters.city);
//     addQueryParam('state', filters.state);
//     addQueryParam('locality', filters.locality);
//     addQueryParam('country', filters.country);
//     addQueryParam('pincode', filters.pincode);

//     try {
//       const url = `http://localhost:8080/api/properties?${queryParams.join('&')}`;
//       console.log('Constructed URL:', url); // Debugging URL construction
//       const response = await fetch(url);

//       if (!response.ok) {
//         // If the response status is not OK, reject the promise with a custom message
//         throw new Error('Failed to fetch properties from the server');
//       }
//       const result = await response.json();

//       // Apply frontend filtering to ensure only relevant properties are shown
//       const filteredProperties = result.data.filter((property: any) =>
//         propertyIds.includes(property.propertyId)
//       );

//       console.log('Filtered Properties:', filteredProperties);

//       return {
//         properties: filteredProperties,
//         totalPages: result.totalPages,
//         currentPage: result.currentPage,
//       };
//     } catch (error) {
//       console.error('Error fetching properties:', error);
//       return rejectWithValue('Failed to fetch properties. Please try again later.');
//     }
//   }
// );

// Async thunk to fetch properties with pagination and filters
export const fetchProperties = createAsyncThunk(
  'properties/fetchProperties',
  async (params: Record<string, any>, { rejectWithValue }) => {
    const queryParams: string[] = [];

    // Helper function to validate and add query parameters
    const addQueryParam = (key: string, value: any) => {
      if (
        value !== null &&
        value !== undefined &&
        (typeof value === 'string' || typeof value === 'number')
      ) {
        queryParams.push(`${key}=${encodeURIComponent(value)}`);
      }
    };

    // Add all necessary query parameters from params
    for (const key in params) {
      if (params[key] !== undefined) {
        addQueryParam(key, params[key]);
      }
    }

    try {
      const url = `http://localhost:8080/api/properties?${queryParams.join('&')}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch properties from the server');
      }

      const result = await response.json();

      return {
        properties: result.data,
        totalPages: result.totalPages,
        currentPage: result.currentPage,
      };
    } catch (error) {
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

export const { setCurrentPage, setFilter, resetFilters, setSelectedProperty, editPropertyById, deletePropertyById } = propertySlice.actions;

export default propertySlice.reducer;
