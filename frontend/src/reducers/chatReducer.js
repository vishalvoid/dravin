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

export const sendMessageReducer = createReducer(initialState, {
  SendMessageRequest: (state) => {
    state.loading = true;
  },
  SendMessageSuccess: (state, action) => {
    state.loading = false;
    state.sendMessage = action.payload;
  },
  SendMessageFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});
export const fetchMessageReducer = createReducer(initialState, {
  fetchMessageRequest: (state) => {
    state.loading = true;
  },
  fetchMessageSuccess: (state, action) => {
    state.loading = false;
    state.fetchMessage = action.payload;
  },
  fetchMessageFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});
