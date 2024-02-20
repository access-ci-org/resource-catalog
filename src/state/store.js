import { configureStore } from "@reduxjs/toolkit";
import catalogSlice from "./catalogSlice";

export const store = configureStore({
  reducer: {
    resourceCatalog: catalogSlice
  }
});