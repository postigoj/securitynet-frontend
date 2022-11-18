import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";



export const getAdmins = createAsyncThunk("ADMINS", async () => {
    try {
      const response = await axios.get("/api/admin");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  });

  export const registerAdmin = createAsyncThunk(
    "NEW_ADMIN",
    async (userData, thunkAPI) => {
      try {
        const response = await axios.post("/api/admin/register", userData);
        return response.data;
      } catch (error) {
        console.log(error.message);
      }
    }
  );

  export const editAdmin = createAsyncThunk("EDIT_ADMIN", async (adminData) => {
    try {
      const { id, data } = adminData;
      const response = await axios.put(`/api/admin/edit/${id}`, data );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  });
  
  export const deleteAdmin = createAsyncThunk("DELETE_ADMIN", async (id) => {
    try {
      const response = await axios.delete(`/api/admin/delete/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  });
  

const adminsReducer = createReducer(
    [],
    {
      [getAdmins.fulfilled]: (state, action) => action.payload, 
      [registerAdmin.fulfilled]: (state, action) => action.payload, 
      [editAdmin.fulfilled]: (state, action) => action.payload, 
      [deleteAdmin.fulfilled]: (state, action) => action.payload, 
    },

  );
  

export default adminsReducer;