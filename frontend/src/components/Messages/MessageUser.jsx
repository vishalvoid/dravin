import React from "react";
import "./Messages.css";
import { createChatAction } from "../../actions/chatAction";
import { useDispatch } from "react-redux";

const MessageUser = ({ avatar, name, userID }) => {
  const dispatch = useDispatch();

  const accessChat = async (userID) => {
    await dispatch(createChatAction(userID));
  };

  return (
    <div className="user-name">
      <div className="dp">
        <img src={avatar} alt="avatar" />
      </div>
      <div className="content" onClick={() => accessChat(userID)}>
        <p className="Name">{name}</p>
        <p className="R-msg">Rescent Message</p>
      </div>
    </div>
  );
};

export default MessageUser;
