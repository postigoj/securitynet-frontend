import { createAction, createReducer } from "@reduxjs/toolkit";

export const getCoords = createAction("GUARD_COORDS");

const coordsReducer = createReducer({}, (builder) => {
  builder.addCase(getCoords, (state, action) => {
    return action.payload;
  });
});

export default coordsReducer;
