import "./MainFeed.css";
import UploadBar from "../UserUpload/UploadBar";
import NewsApi from "./NewsApi";
import { useEffect } from "react";
import Friends from "./Friends";
import Post from "./Post";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getFollowingPosts } from "../../actions/UserAction";
import Loader from "../../Loader/Loader";
import { useAlert } from "react-alert";

function Home(props) {
  const dispatch = useDispatch();
  const { loading, post, error } = useSelector(
    (state) => state.postOfFollowing
  );

  const { users } = useSelector((state) => state.allUsers);

  const alert = useAlert();
  const { error: errorLikes, message } = useSelector((state) => state.like);

  useEffect(() => {
    dispatch(getFollowingPosts());
    dispatch(getAllUsers());
  }, [dispatch]);

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
            <UploadBar theme={props.theme} />

            {/* Box For main Feed  */}
            {post && post.length > 0 ? (
              post.map((post) => (
                <Post
                  key={post._id}
                  postID={post._id}
                  caption={post.caption}
                  postImage={post.image.url}
                  likes={post.likes}
                  comments={post.comments}
                  ownerImage={post.owner.avatar.url}
                  ownerName={post.owner.name}
                  ownerID={post.owner._id}
                ></Post>
              ))
            ) : (
              <div className="box">
                <h3 className="nopost">Make friends to get their Post.</h3>
              </div>
            )}
          </div>

          {/* Side Box For News and Api Related Work  */}

          <div className="tile-2">
            <NewsApi />
            <div className="tile-2-child">
              <div className="side-box_friends">
                <h2>#Friends</h2>
                {users && users.length > 0 ? (
                  users.map((user) => (
                    <Friends
                      key={user._id}
                      userID={user._id}
                      avatar={user.avatar.url}
                      name={user.name}
                    />
                  ))
                ) : (
                  <h6>Getting users....</h6>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default Home;
