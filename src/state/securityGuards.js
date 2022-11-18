import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";


export const getSecurityGuards = createAsyncThunk(
    "GET_SECURITY_GUARDS",
    async () => {
        try {
            const response = await axios.get("api/securityguard/all/active");
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const registerGuards = createAsyncThunk(
  "NEW_GUARD",
  async (guardData) => {
    try {
      const response = await axios.post(
        "/api/securityguard/register",
        guardData
      );
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const statusGuards = createAsyncThunk(
    "STATUS_GUARD",
    async (guardData) => {
        try {
            const response = await axios.put(
                `/api/securityguard/status/${guardData.id}`,
            );
            return response.data;
        } catch (error) {
            console.log(error.message);
        }
    }
);


export const updateGuards = createAsyncThunk(
    "UPDATE_GUARD",
    async (guardData) => {
    const { id, data } = guardData;
        try {
            const response = await axios.put(
                `/api/securityguard/update/${id}`,
                data
            );
            return response.data;
        } catch (error) {
            console.log(error.message);
        }
    }
);


const securityGuardsReducer = createReducer(
  [],
  {
    [registerGuards.fulfilled]: (state, action) => action.payload,
    [getSecurityGuards.fulfilled]: (state, action) => action.payload,
    [statusGuards.fulfilled]: (state, action) => action.payload,
    [updateGuards.fulfilled]: (state, action) => action.payload,
  }
);

export default securityGuardsReducer;
