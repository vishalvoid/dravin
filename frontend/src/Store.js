import { configureStore } from "@reduxjs/toolkit";
import { likeReducer, myPostsReducer } from "./reducers/postReducer";
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
    like: likeReducer,
    myPosts: myPostsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
