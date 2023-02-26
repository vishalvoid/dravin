import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const userReducer = createReducer(initialState, {
  LoginRequest: (state) => {
    state.loading = true;
    state.isAuthenticated = false;
  },
  LoginSuccess: (state, action) => {
    state.loading = true;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  LoginFailure: (state, action) => {
    state.loading = true;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  RegisterRequest: (state, action) => {
    state.loading = true;
    state.isAuthenticated = false;
  },
  RegisterSuccess: (state, action) => {
    state.loading = true;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  RegisterFailure: (state, action) => {
    state.loading = true;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  LoadUserRequest: (state, action) => {
    state.loading = true;
    state.isAuthenticated = false;
  },
  LoadUserSuccess: (state, action) => {
    state.loading = true;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  LoadUserFailure: (state, action) => {
    state.loading = true;
    state.error = action.payload;
    state.isAuthenticated = false;
  },
});

export const postOfFollowingReducer = createReducer(initialState, {
  postOfFollowingRequest: (state) => {
    state.loading = true;
  },
  postOfFollowingSuccess: (state, action) => {
    state.loading = false;
    state.post = action.payload;
  },
  postOfFollowingFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});

export const allUsersReducer = createReducer(initialState, {
  allUsersRequest: (state) => {
    state.loading = true;
  },
  allUsersSuccess: (state, action) => {
    state.loading = false;
    state.users = action.payload;
  },
  allUsersFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});
