import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";


export const getFilteredBranchOffice = createAsyncThunk("FILTERED_BANCHOFFICE", async (data) => {   
    const {id} = data;
  try {
    const response = await axios.get(`api/securityguard/all/branchoffices/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

const filteredBranchOfficeReducer = createReducer([], {
  [getFilteredBranchOffice.fulfilled]: (state, action) => action.payload
});

export default filteredBranchOfficeReducer;