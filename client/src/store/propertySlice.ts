import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

// async thunk to fetch properties ======
export const fetchProperties = createAsyncThunk(
  "property/fetchProperties",   
    async () => {
        const response = await axios.get("/api/properties");
        return response.data;
    }   
);

// async thunk to fetch a property by ID ======
export const fetchPropertyById = createAsyncThunk(
  "property/fetchPropertyById",
  async (id: string) => {
    const response = await axios.get(`/api/properties/${id}`)
    return response.data
  }
)

// Type safety =========Property
export interface Property {
  _id: string;
  title: string;
  price: number;
  type: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  description?: string;
  area: number;
  amenities?: string[];
  images?: string[];
  archived?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface propertyState {
  properties: Property[];    
    loading: boolean;
    error: string | null;
}   

// initial state == Empty at first =========
const initialState: propertyState = {   
    properties: [],
    loading: false,
    error: null,
    };  

// create the slice ===========
const propertySlice = createSlice({
    name: "property",
    initialState,
    reducers: {}, //No synchronous 
    
    extraReducers: (builder) => {
        builder
            .addCase(fetchProperties.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProperties.fulfilled, (state, action) => {
                state.loading = false;
                state.properties = action.payload;
            })
            .addCase(fetchProperties.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch properties";
            })
            .addCase(fetchPropertyById.fulfilled, (state, action) => {
  const found = state.properties.find(p => p._id === action.payload._id)
  if (!found) {
    state.properties.push(action.payload)
  }
})

    },
});


// export the reducer=======end=======
export default propertySlice.reducer;