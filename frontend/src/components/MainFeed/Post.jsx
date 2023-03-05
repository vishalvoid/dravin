import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCommentOnPost, likePost } from "../../actions/postAction";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import Friends from "./Friends";
import { getFollowingPosts } from "../../actions/UserAction";
import CommentCard from "./CommentCard";

function Post({
  postID,
  caption,
  postImage,
  likes = [],
  comments = [],
  ownerImage,
  ownerName,
  ownerID,
  isDelete = true,
  isAccount = false,
}) {
  const [liked, setliked] = useState(false);
  const [likesUser, setlikesUser] = useState(false);
  const [commentValue, setcommentValue] = useState("");
  const [commentToggle, setcommentToggle] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleLikes = async () => {
    setliked(!liked);
    await dispatch(likePost(postID));

    if (isAccount) {
      console.log("bring my post baby");
    } else {
      dispatch(getFollowingPosts());
    }
  };

  useEffect(() => {
    likes.forEach((item) => {
      if (item._id === user._id) {
        setliked(true);
      }
    });
  }, [likes, user._id]);

  const addCommentHandler = async (e) => {
    e.preventDefault();
    await dispatch(addCommentOnPost(postID, commentValue));

    if (isAccount) {
      console.log("bring my post baby");
    } else {
      dispatch(getFollowingPosts());
    }
  };
  return (
    <div className={`box `}>
      <div className={`box-header `}>
        <figure>
          <img src={postImage} alt="avatar" />
        </figure>
        <Link className="postName__header" to={`/user/${ownerID}`}>
          <p>{ownerName}</p>
        </Link>
        <p className="caption">{caption}</p>
        {isAccount ? <i className="bi bi-three-dots-vertical"></i> : null}
      </div>
      <div className={`box-content `}>
        <img src={postImage} alt="avatar" />
      </div>
      <button
        className="likes"
        onClick={() => setlikesUser(!likesUser)}
        disabled={likes.length === 0 ? true : false}
      >
        {likes.length} likes
      </button>
      <div className={`box-footer `}>
        <div className="comment__icon">
          <i
            onClick={() => {
              setcommentToggle(true);
            }}
            className="bi bi-chat-right"
          ></i>
        </div>

        <button className="post_liked--buttons" onClick={handleLikes}>
          {!liked ? (
            <i className="bi bi-heart"></i>
          ) : (
            <i className="bi bi-heart-fill"></i>
          )}
        </button>

        <i className="bi bi-send"></i>

        {isDelete ? (
          <button className="delete">
            <i className="bi bi-trash"></i>
          </button>
        ) : null}
      </div>
      <Modal
        classNames="box-modal"
        open={likesUser}
        onClose={() => setlikesUser(!likesUser)}
      >
        <div className="dialogbox">
          <h1>Liked By</h1>

          <div className="likebox">
            {likes.map((like) => {
              return (
                <Friends
                  key={like._id}
                  userID={like._id}
                  avatar="./logo.gif"
                  name={like.name}
                />
              );
            })}
          </div>
        </div>
      </Modal>
      <Modal
        classNames="box-modal"
        open={commentToggle}
        onClose={() => setcommentToggle(!commentToggle)}
      >
        <div className="dialogbox">
          <h1>Comments</h1>

          <form className="commentForm" onSubmit={addCommentHandler}>
            <input
              type="text"
              value={commentValue}
              onChange={(e) => setcommentValue(e.target.value)}
              placeholder="Comment Here"
              required
              className="CommentCard__input"
            />

            <button
              className="CommentCard__add"
              type="submit"
              variant="contained"
            >
              Add
            </button>
          </form>
          <div className="comments">
            {comments.length > 0 ? (
              comments.map((item) => (
                <CommentCard
                  key={item._id}
                  name={item.user.name}
                  comment={item.comment}
                  avatar={item.user.avatar.url}
                />
              ))
            ) : (
              <p>No Comments Yet</p>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Post;
