import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";



export const getAdmin = createAsyncThunk("ADMIN_ME", async (userData) => {
  try {
    const response = await axios.get("/api/admin/me", userData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});




const adminReducer = createReducer(
  {},
  {
    [getAdmin.fulfilled]: (state, action) => action.payload,
  }
);

export default adminReducer;
