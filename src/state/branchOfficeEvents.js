import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";

export const getBranchOfficeEvents = createAsyncThunk(
  "EVENT_BRANCHOFFICE",
  async (id) => {
    try {
      const response = await axios.get(`/api/event/branchoffices/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addEvent = createAsyncThunk("ADD_EVENT", async (eventInfo) => {
  const { title, start, end,date, guardId, branchOfficeId } = eventInfo;
  try {
    const response = await axios.post(
      `/api/event/add/${guardId}/${branchOfficeId}`,
      { title, start, end,date }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const deleteEvent = createAsyncThunk("DELETE_EVENT", async (data) => {
  const { eventId, securityGuardId, branchOfficeId } = data;
  try {
    const response = await axios.delete(`/api/event/unsubscribe/${eventId}`, {
      headers: {
        Authorization: "ATR",
      },
      data: {
        securityGuardId,
        branchOfficeId,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
});


export const editEvent = createAsyncThunk("EDIT_EVENT", async (info) => {
  const { eventId, end, start, date, title, securityGuardId,branchOfficeId } = info;
  try {
    const response = await axios.put(`/api/event/edit/${eventId}`, {
      end,
      start,
      date,
      title,
      securityGuardId,
      branchOfficeId,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
});


const branchOfficeEventsReducer = createReducer([], {
  [getBranchOfficeEvents.fulfilled]: (state, action) => action.payload,
  [addEvent.fulfilled]: (state, action) => {
    state.push(action.payload);
    return state;
  },
  [deleteEvent.fulfilled]: (state, action) => {
    const newState = state.filter((event) => event.id !== action.payload.id);
    return newState;
  },
  [editEvent.fulfilled]: (state, action) => {
    const newState = state.map((event) => {
      if (event.id === action.payload.id) {
        return action.payload;
      }
      return event;
    });
    return newState;
  },

  
});

export default branchOfficeEventsReducer;
