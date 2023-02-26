import "./MainFeed.css";
import UploadBar from "../UserUpload/UploadBar";
import NewsApi from "./NewsApi";
import axios from "axios";
import { useEffect, useState } from "react";
import Friends from "./Friends";
import Post from "./Post";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getFollowingPosts } from "../../actions/UserAction";
import Loader from "../../Loader/Loader";
import { Link } from "react-router-dom";

function Home(props) {
  const [apiData, setapiData] = useState("");
  const dispatch = useDispatch();
  const { loading, post, error } = useSelector(
    (state) => state.postOfFollowing
  );

  const { users, loading: userLoading } = useSelector(
    (state) => state.allUsers
  );
  console.log(users);

  useEffect(() => {
    axios
      .get("https://dog.ceo/api/breeds/image/random")
      .then((res) => setapiData(res.data));
  }, []);

  useEffect(() => {
    dispatch(getFollowingPosts());
    dispatch(getAllUsers());
  }, [dispatch]);

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
                  postImage={apiData.message}
                  likes={post.likes}
                  comments={post.comments}
                  ownerImage={post.owner.avatar.url}
                  ownerName={post.owner.name}
                  ownerID={post.owner._id}
                ></Post>
              ))
            ) : (
              <h2>follow Someone to see Their Posts.</h2>
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
                      avatar={apiData.message}
                      name={user.name}
                    />
                  ))
                ) : (
                  <h6>Users Not Available Yet</h6>
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
