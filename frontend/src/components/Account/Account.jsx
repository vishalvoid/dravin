import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyPosts, logoutUser } from "../../actions/UserAction";
import Post from "../MainFeed/Post";
import Loader from "../../Loader/Loader";
import { useAlert } from "react-alert";
import "./Account.css";
import { Link } from "react-router-dom";
import Modal from "react-responsive-modal";
import Friends from "../MainFeed/Friends";

const Account = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { loading, error, posts } = useSelector((state) => state.myPosts);
  const alert = useAlert();
  const { error: errorLikes, message } = useSelector((state) => state.like);
  const [followers, setfollowers] = useState(false);
  const [following, setfollowing] = useState(false);

  useEffect(() => {
    dispatch(getMyPosts());
  }, [dispatch]);

  const LogoutHandler = async () => {
    await dispatch(logoutUser());
    alert.success("Logged out successfully");
  };

  useEffect(() => {
    if (errorLikes) {
      alert.error(errorLikes);
      dispatch({ type: "clearErrors" });
    }
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [error, message, alert, dispatch, errorLikes]);

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
                  isAccount={true}
                  isDelete={true}
                ></Post>
              ))
            ) : (
              <h3 className="nopost">You Don't Have Any Post</h3>
            )}
          </div>

          <div className="tile-2">
            <div className="account__profile-picture">
              <img src={user.avatar.url} alt="" />
            </div>

            <p className="account__name">{user.name}</p>
            <p className="account__followers-num">{user.followers.length}</p>
            <p className="account__followers">
              <span
                onClick={() => setfollowers(!followers)}
                className="hoverbtn"
              >
                {" "}
                Followers
              </span>
            </p>
            <p className="account__followers-num">{user.following.length}</p>
            <p className="account__followers">
              <span
                onClick={() => setfollowing(!following)}
                className="hoverbtn"
              >
                {" "}
                Following
              </span>
            </p>
            <p className="account__followers-num">{user.posts.length}</p>
            <p className="account__followers">Post</p>
            <p className="account__logout">
              <span onClick={LogoutHandler} className="hoverbtn-logout">
                Logout
              </span>
            </p>
            <p className="account__changes">
              <Link className="account__chng" to="/update/profile">
                Edit Profile
              </Link>
            </p>
            <p className="account__changes">
              <Link className="account__chng" to="/update/password">
                Change Password
              </Link>
            </p>
          </div>
          <Modal
            classNames="box-modal"
            open={followers}
            onClose={() => setfollowers(!followers)}
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
                        avatar="./logo.gif"
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
            open={following}
            onClose={() => setfollowing(!following)}
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
                        avatar="./logo.gif"
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
export default Account;
