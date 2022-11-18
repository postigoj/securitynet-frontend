import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { formatDate } from "@fullcalendar/react";


export const getFilteredGuards = createAsyncThunk("FILTERED_GUARDS", async (data) => {
  const {id, dateEvent}= data
      
  try {
    const response = await axios.get(`api/branchoffice/all/guards/${id}`,{headers:{dateEvent}});
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

const filteredGuardsReducer = createReducer([], {
  [getFilteredGuards.fulfilled]: (state, action) => action.payload
});

export default filteredGuardsReducer;