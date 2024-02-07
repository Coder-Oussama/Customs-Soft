import { configureStore } from "@reduxjs/toolkit";
import PatientSlice from "./PatientSlice";

export const store = configureStore({
  reducer: {
    patients:PatientSlice ,
  },
});
