import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";

export const getOneBranchOffice = createAsyncThunk("ONE_BRANCHOFFICE", async (id) => {
  try {
    const response = await axios.get(`/api/branchoffice/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});


const oneBranchOfficeReducer = createReducer({}, {
  [getOneBranchOffice.fulfilled]: (state, action) => {
    return action.payload},
});
    

export default oneBranchOfficeReducer;