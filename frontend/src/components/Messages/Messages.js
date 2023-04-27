import React from "react";
import { useSelector } from "react-redux";
import "./Messages.css";
import MessageUser from "./MessageUser";

export default function Messages() {
  const { user } = useSelector((state) => state.user);
  const { users } = useSelector((state) => state.allUsers);

  console.log(user);
  return (
    <div className="container-msg">
      <div className="user-tab">
        <div className="user-header">
          <p>Messages</p>
          <i className="bi bi-gear-fill"></i>
        </div>
        <div className="search-bar">
          <input
            className="search-bar-component"
            type="text"
            placeholder="Search"
          />
          <i className="bi bi-search"></i>
        </div>

        {users && users.length > 0 ? (
          users.map((users) => (
            <MessageUser avatar={users.avatar.url} name={users.name} />
          ))
        ) : (
          <p>No users available</p>
        )}
      </div>
      <div className="chat-tab">
        <div className="friend-header">
          <div className="friend-header-img">
            <img src={user.avatar.url} alt="" />
          </div>
          <div className="name">
            <p className="friend-header-name">Dillin Nair</p>
          </div>
        </div>
        <div className="chat-window"></div>
        <div className="chat-footer">
          <div className="msg-box">
            <input type="text" name="" id="" placeholder="Start Typing ..." />
            <div className="upload-img">
              <i className="bi bi-paperclip"></i>
            </div>
          </div>

          <div className="send-msg">
            <i className="bi bi-send-fill"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
