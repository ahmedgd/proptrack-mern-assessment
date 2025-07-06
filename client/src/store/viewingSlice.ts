import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Viewing type ========
interface Viewing {
  _id: string;
  propertyId: string | { _id: string; title: string };  
  clientId: string | { _id: string; name: string };    
  date: string;
  time: string;
  status: "scheduled" | "completed" | "cancelled";
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

// State type =========
interface viewingState {
  viewings: Viewing[];
  loading: boolean;
  error: string | null;
}

// initial state ========
const initialState: viewingState = {
  viewings: [],
  loading: false,
  error: null,
};

// === fetch all viewings === GET
export const fetchViewings = createAsyncThunk(
  "viewing/fetchViewings",
  async () => {
    const response = await axios.get("/api/viewings");
    return response.data;
  }
);

// === create new viewing === POST
export const createViewing = createAsyncThunk(
  "viewing/createViewing",
  async (viewingData: Omit<Viewing, "_id" | "createdAt" | "updatedAt">) => {
    const response = await axios.post("/api/viewings", viewingData);
    return response.data;
  }
);

// === update a viewing === PUT
export const updateViewing = createAsyncThunk(
  "viewing/updateViewing",
  async ({ id, data }: { id: string; data: Partial<Omit<Viewing, "_id">> }) => {
    const response = await axios.put(`/api/viewings/${id}`, data);
    return response.data;
  }
);

// === delete a viewing === DELETE
export const deleteViewing = createAsyncThunk(
  "viewing/deleteViewing",
  async (id: string) => {
    await axios.delete(`/api/viewings/${id}`);
    return id;
  }
);

// slice ============
const viewingSlice = createSlice({
  name: "viewing",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch viewings
      .addCase(fetchViewings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchViewings.fulfilled, (state, action) => {
        state.loading = false;
        state.viewings = action.payload;
      })
      .addCase(fetchViewings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch viewings";
      })

      // create viewing
      .addCase(createViewing.fulfilled, (state, action) => {
        state.viewings.push(action.payload);
      })

      // update viewing
      .addCase(updateViewing.fulfilled, (state, action) => {
        const idx = state.viewings.findIndex((v) => v._id === action.payload._id);
        if (idx !== -1) {
          state.viewings[idx] = action.payload;
        }
      })

      // delete viewing
      .addCase(deleteViewing.fulfilled, (state, action) => {
        state.viewings = state.viewings.filter((v) => v._id !== action.payload);
      });
  },
});

// === export reducer
export default viewingSlice.reducer;
