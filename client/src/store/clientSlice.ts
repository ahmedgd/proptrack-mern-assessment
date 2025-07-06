import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// NewClientLead type
interface NewClientLead {
  name: string;
  email: string;
  phone: string;
  budget?: number;
  message: string;
  preferences?: {
    type?: string;
    location?: string;
    bedrooms?: number;
    bathrooms?: number;
  };
  interestedProperties?: string[];
}

// fetch all clients
export const fetchClients = createAsyncThunk(
  "client/fetchClients",
  async () => {
    const response = await axios.get("/api/clients");
    return response.data;
  }
);

// create client lead
export const createClientLead = createAsyncThunk(
  "client/createClientLead",
  async (leadData: NewClientLead) => {
    const response = await axios.post("/api/clients", leadData);
    return response.data;
  }
);

// delete client
export const deleteClient = createAsyncThunk(
  "client/deleteClient",
  async (id: string) => {
    await axios.delete(`/api/clients/${id}`);
    return id;
  }
);

// update status
export const updateClientStatus = createAsyncThunk(
  "client/updateStatus",
  async ({ id, status }: { id: string; status: string }) => {
    const response = await axios.patch(`/api/clients/${id}/status`, { status });
    return response.data;
  }
);

// Client type
interface Client {
  _id: string;
  name: string;
  email: string;
  phone: string;
  budget?: number;
  message: string;
  preferences?: {
    type?: string;
    location?: string;
    bedrooms?: number;
    bathrooms?: number;
  };
  interestedProperties?: string[];
  status: "new" | "contacted" | "follow-up" | "closed";
  createdAt?: string;
  updatedAt?: string;
}

// state
interface clientState {
  clients: Client[];
  loading: boolean;
  error: string | null;
}

const initialState: clientState = {
  clients: [],
  loading: false,
  error: null,
};

// slice
const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = action.payload;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch clients";
      })
      .addCase(createClientLead.fulfilled, (state, action) => {
        state.clients.push(action.payload);
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.clients = state.clients.filter((c) => c._id !== action.payload);
      })
      .addCase(updateClientStatus.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.clients.findIndex((c) => c._id === updated._id);
        if (index !== -1) {
          state.clients[index] = updated;
        }
      });
  },
});

export default clientSlice.reducer;
