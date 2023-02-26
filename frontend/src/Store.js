import { configureStore } from "@reduxjs/toolkit";
import {
  allUsersReducer,
  postOfFollowingReducer,
  userReducer,
} from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    postOfFollowing: postOfFollowingReducer,
    allUsers: allUsersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
