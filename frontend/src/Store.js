import { configureStore } from "@reduxjs/toolkit";
import {
  likeReducer,
  myPostsReducer,
  userPostsReducer,
} from "./reducers/postReducer";
import {
  allUsersReducer,
  postOfFollowingReducer,
  userReducer,
  userProfileReducer,
} from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    postOfFollowing: postOfFollowingReducer,
    allUsers: allUsersReducer,
    like: likeReducer,
    myPosts: myPostsReducer,
    userProfile: userProfileReducer,
    userPosts: userPostsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
