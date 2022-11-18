import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";


export const sendMail = createAsyncThunk("SEND_MAIL", async (email) => {
  try {
    const response = await axios.put("/api/admin/forgot-password", email);
    return response.data;
  } catch (error) {
    //console.log("error",error);
    if(error.response.status === 400){
      return error.response.data
    }
  }
});

export const resetPassword = createAsyncThunk("RESET_PASSWORD", async (obj) => {
  
  try {
    const response = await axios.put("/api/admin/create-new-password", obj);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});


const resetPasswordReducer = createReducer('',
  {
    [sendMail.fulfilled]: (state, action) => action.payload,
    [resetPassword.fulfilled]: (state, action) => action.payload,

  }
);

export default resetPasswordReducer;
