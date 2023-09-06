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
import {
  fetchMessageReducer,
  sendMessageReducer,
  userMessagesReducer,
} from "./reducers/chatReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    postOfFollowing: postOfFollowingReducer,
    allUsers: allUsersReducer,
    like: likeReducer,
    myPosts: myPostsReducer,
    userProfile: userProfileReducer,
    userPosts: userPostsReducer,
    chatBox: userMessagesReducer,
    sendMessage: sendMessageReducer,
    fetchMessage: fetchMessageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
