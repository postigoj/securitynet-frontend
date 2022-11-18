import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";

export const getBranchOffices = createAsyncThunk(
  "BRANCHOFFICES",
  async (clientId) => {
    try {
      const response = await axios.get(`/api/branchoffice/all/${clientId}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const editBranchOffice = createAsyncThunk(
  "EDIT_BRANCHOFFICES",
  async (obj) => {
    const clientId = obj.clientId;
    const sucursalId = obj.sucursalId;
    const payload = {
      adress: obj.adress,
      province: obj.province,
    };
    try {
      const response = await axios.put(
        `/api/branchoffice/edit/${sucursalId}/${clientId}`,
        payload
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const registerBranchOffice = createAsyncThunk(
  "BRANCHOFFICE",
  async (branchOfficeObj) => {
    const { data, clientId } = branchOfficeObj;
    try {
      const response = await axios.post(
        `/api/branchoffice/register/${clientId}`,
        data
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteBranchOffice = createAsyncThunk(
  "DELETE_BRANCHOFFICE",
  async (obj) => {
    const clientId = obj.clientId;
    const branchOfficeId = obj.branchOfficeId;
    try {
      const response = await axios.put(
        `/api/branchoffice/status/off/${clientId}/${branchOfficeId}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const branchOfficesReducer = createReducer([], {
  [getBranchOffices.fulfilled]: (state, action) => action.payload,
  [editBranchOffice.fulfilled]: (state, action) => action.payload,
  [registerBranchOffice.fulfilled]: (state, action) => action.payload,
  [deleteBranchOffice.fulfilled]: (state, action) => action.payload,
});

export default branchOfficesReducer;
