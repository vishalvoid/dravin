import React from "react";

const CommentCard = ({ name, avatar, comment }) => {
  return (
    <div className="Comment__Card">
      <div className="CommentCard__avatar">
        <img src={avatar} alt="" />
      </div>
      <div className="CommentCard__data">
        <div className="CommentCard__name">
          <p className="CommentCard__name">{name}</p>
        </div>
        <div className="CommentCard__comment">
          <p className="CommentCard__comment">{comment}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
