import React from "react";
import "./Messages.css";

const MessageUser = ({ avatar, name }) => {
  return (
    <div className="user-name">
      <div className="dp">
        <img src={avatar} alt="avatar" />
      </div>
      <div className="content">
        <p className="Name">{name}</p>
        <p className="R-msg">Rescent Message</p>
      </div>
    </div>
  );
};

export default MessageUser;
