import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";


export const getUser = createAsyncThunk("USER", async () => {
  try {
    const res = await axios.get("/api/admin/me");
    return res.data;
  } catch (error) {
    console.log(error);
  }
});


export const loginUser = createAsyncThunk("LOGIN_USER", async (userData) => {
  try {
    const response = await axios.post("/api/admin/login", userData);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.status
  }
});


export const logoutUser = createAsyncThunk("LOGOUT_USER", async () => {
  try {
    const res = await axios.post("/api/admin/logout", {});
    return res.data;
  } catch (error) {
    console.log(error);
  }

});

const userReducer = createReducer({},
  {
    [getUser.fulfilled]: (state, action) => action.payload,
    [loginUser.fulfilled]: (state, action) => action.payload,
    [logoutUser.fulfilled]: (state, action) => action.payload,
  }
);

export default userReducer;
