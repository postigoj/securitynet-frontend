import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";

export const getOneSecurityGuard = createAsyncThunk("ONE_SECURITYGUARD", async (id) => {
  try {
    const response = await axios.get(`/api/securityguard/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});


const oneSecurityGuardReducer = createReducer({}, {
  [getOneSecurityGuard.fulfilled]: (state, action) => {
    return action.payload},
});
    

export default oneSecurityGuardReducer