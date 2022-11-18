import { createAction, createReducer } from "@reduxjs/toolkit";

export const isSelected = createAction("IS_SELECTED");

const isSelectedReducer = createReducer(false, (builder) => {
  builder.addCase(isSelected, (state, action) => {
    //console.log(action.payload);
    return action.payload;
  });
});

export default isSelectedReducer;
