import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../MainFeed/Post";
import Loader from "../../Loader/Loader";
import { useAlert } from "react-alert";
import "./../Account/Account.css";
import Modal from "react-responsive-modal";
import Friends from "../MainFeed/Friends";
import { useParams } from "react-router-dom";
import {
  followAndUnfollowUser,
  getUserPosts,
  getUserProfile,
} from "../../actions/UserAction";

const UserProfile = () => {
  const dispatch = useDispatch();

  const alert = useAlert();
  //   const { error: errorLikes, message } = useSelector((state) => state.like);
  //   const [followers, setfollowers] = useState(false);
  //   const [following, setfollowing] = useState(false);

  const {
    user,

    error: userError,
  } = useSelector((state) => state.userProfile);

  const { user: me } = useSelector((state) => state.user);

  const { loading, error, posts } = useSelector((state) => state.userPosts);
  const {
    error: followError,
    message,
    loading: followLoading,
  } = useSelector((state) => state.like);

  const params = useParams();
  const [followersToggle, setFollowersToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);
  const [following, setFollowing] = useState(false);
  const [myProfile, setMyProfile] = useState(false);

  useEffect(() => {
    dispatch(getUserPosts(params.id));
    dispatch(getUserProfile(params.id));
  }, [dispatch, params.id]);

  const followHandler = async () => {
    setFollowing(!following);
    await dispatch(followAndUnfollowUser(user._id));
    dispatch(getUserProfile(params.id));
  };

  useEffect(() => {
    if (me._id === params.id) {
      setMyProfile(true);
    }
    if (user) {
      user.followers.forEach((item) => {
        if (item._id === me._id) {
          setFollowing(true);
        } else {
          setFollowing(false);
        }
      });
    }
  }, [user, me._id, params.id]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }

    if (followError) {
      alert.error(followError);
      dispatch({ type: "clearErrors" });
    }

    if (userError) {
      alert.error(userError);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [alert, error, message, followError, userError, dispatch]);

  return (
    <>
      {!loading ? (
        <div className="tile-container">
          {/* Main Feed is Starts From Here  */}
          <div className="tile-1">
            {posts && posts.length > 0 ? (
              posts.map((posts) => (
                <Post
                  key={posts._id}
                  postID={posts._id}
                  caption={posts.caption}
                  postImage={posts.image.url}
                  likes={posts.likes}
                  comments={posts.comments}
                  ownerImage={posts.owner.avatar.url}
                  ownerName={posts.owner.name}
                  ownerID={posts.owner._id}
                  isAccount={false}
                  isDelete={false}
                ></Post>
              ))
            ) : (
              <h3 className="nopost">User has not made any post</h3>
            )}
          </div>

          <div className="tile-2">
            {user && (
              <>
                <div className="account__profile-picture">
                  <img src={user.avatar.url} alt="" />
                </div>

                <p className="account__name">{user.name}</p>
                <p className="account__followers-num">
                  {user.followers.length}
                </p>
                <p className="account__followers">
                  <span
                    onClick={() => setFollowersToggle(!followersToggle)}
                    className="hoverbtn"
                  >
                    {" "}
                    Followers
                  </span>
                </p>
                <p className="account__followers-num">
                  {user.following.length}
                </p>
                <p className="account__followers">
                  <span
                    onClick={() => setFollowingToggle(!followingToggle)}
                    className="hoverbtn"
                  >
                    {" "}
                    Following
                  </span>
                </p>
                <p className="account__followers-num">{user.posts.length}</p>
                <p className="account__followers">Post</p>
                {myProfile ? null : (
                  <p className="account__logout">
                    <span
                      onClick={followHandler}
                      disabled={followLoading}
                      className="hoverbtn-logout"
                      style={{ background: following ? "red" : "" }}
                    >
                      {following ? "Unfollow" : "Follow"}
                    </span>
                  </p>
                )}
              </>
            )}
          </div>
          <Modal
            classNames="box-modal"
            open={followersToggle}
            onClose={() => setFollowingToggle(!followersToggle)}
          >
            <div className="dialogbox">
              <h1>Followers</h1>

              <div className="likebox">
                {user && user.followers.length > 0 ? (
                  user.followers.map((follower) => {
                    return (
                      <Friends
                        key={follower._id}
                        userID={follower._id}
                        avatar={follower.avatar.url}
                        name={follower.name}
                      />
                    );
                  })
                ) : (
                  <div className="tile-2">
                    <p>You don't have any post to show</p>
                  </div>
                )}
              </div>
            </div>
          </Modal>
          <Modal
            classNames="box-modal"
            open={followingToggle}
            onClose={() => setFollowingToggle(!followingToggle)}
          >
            <div className="dialogbox">
              <h1>Following</h1>

              <div className="likebox">
                {user && user.following.length > 0 ? (
                  user.following.map((following) => {
                    return (
                      <Friends
                        key={following._id}
                        userID={following._id}
                        avatar={following.avatar.url}
                        name={following.name}
                      />
                    );
                  })
                ) : (
                  <p>You are not following anyone...</p>
                )}
              </div>
            </div>
          </Modal>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};
export default UserProfile;
