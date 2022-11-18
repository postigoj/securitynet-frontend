import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";

export const getClients = createAsyncThunk("CLIENTS", async () => {
  try {
    const response = await axios.get("/api/client/all/active");
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const registerClient = createAsyncThunk("CLIENT", async (clientObj) => {
  try {
    const response = await axios.post("/api/client/register", clientObj);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const editClient = createAsyncThunk("EDIT_CLIENT", async (clientObj) => {
  const clientId = clientObj.clientId;
 const payload = {
   name: clientObj.name,
   email: clientObj.email,
   cuit: clientObj.cuit,
   legalAdress: clientObj.legalAdress,
   startContract: clientObj.startContract,
   endContract: clientObj.endContract,
 };
 try {
   const response = await axios.put(`/api/client/edit/${clientId}`, payload);
   return response.data;
 } catch (error) {
   console.log(error);
 } 
});

export const deleteClient = createAsyncThunk("DELETE_CLIENT", async (clientId) => {
  try {
    const response = await axios.put(`/api/client/status/${clientId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

const clientsReducer = createReducer([], {
  [getClients.fulfilled]: (state, action) => action.payload,
  [registerClient.fulfilled]: (state, action) => action.payload,
  [editClient.fulfilled]: (state, action) => action.payload,
  [deleteClient.fulfilled]: (state, action) => action.payload,
});

export default clientsReducer;
