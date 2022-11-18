import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";

export const getProvinces = createAsyncThunk("PROVINCES", async () => {
  try {
    const response = await axios.get("/api/province");
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

const provincesReducer = createReducer([], {
  [getProvinces.fulfilled]: (state, action) => action.payload
});

export default provincesReducer;