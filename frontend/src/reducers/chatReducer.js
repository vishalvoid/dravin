import { createReducer } from "@reduxjs/toolkit";
const initialState = {};

export const userMessagesReducer = createReducer(initialState, {
  ChatBoxRequest: (state) => {
    state.loading = true;
  },
  ChatBoxSuccess: (state, action) => {
    state.loading = false;
    state.chatBox = action.payload;
  },
  ChatBoxFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});
