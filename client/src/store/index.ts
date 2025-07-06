import { configureStore } from "@reduxjs/toolkit"

// ============ Importing reducers ===========
import propertyReducer from "./propertySlice"
import clientReducer from "./clientSlice"
import viewingReducer from "./viewingSlice"

// create the store ----First----------configureStore
export const store = configureStore({
  reducer: {
    property: propertyReducer,
    client: clientReducer,
    viewing: viewingReducer,
  },
})

// type RootState =========
export type RootState = ReturnType<typeof store.getState>

// type AppDispatch =========
export type AppDispatch = typeof store.dispatch
