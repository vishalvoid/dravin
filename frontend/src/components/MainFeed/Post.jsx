import React, { useState } from "react";
import { Link } from "react-router-dom";

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

  const handleLikes = () => {
    setliked(!liked);
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
        {isAccount ? <i class="bi bi-three-dots-vertical"></i> : null}
      </div>
      <div className={`box-content `}>
        <img src={postImage} alt="avatar" />
      </div>
      <button className="likes">5 likes</button>

      <div className={`box-footer `}>
        <i className="bi bi-chat-right"></i>
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
    </div>
  );
}

export default Post;
