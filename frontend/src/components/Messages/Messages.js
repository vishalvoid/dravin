import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Messages.css";
import MessageUser from "./MessageUser";
import { getAllUsers } from "../../actions/UserAction";

export default function Messages() {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = React.useState("");
  const { users, loading } = useSelector((state) => state.allUsers);
  const [selectedChat, setselectedChat] = useState();

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllUsers(name));
  };

  return (
    <div className="container-msg">
      <div className="user-tab">
        <div className="user-header">
          <p>Messages</p>
          <i className="bi bi-gear-fill"></i>
        </div>
        <div className="search-bar">
          <form action="" onSubmit={submitHandler}>
            <input
              className="search-bar-component"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Search"
            />
            <button className="message__search-submit" type="submit ">
              {" "}
              <i className="bi bi-search"></i>
            </button>
          </form>
        </div>

        <div className="message_users-list">
          {users && users.length > 0 ? (
            users.map((users) => (
              <MessageUser
                avatar={users.avatar.url}
                name={users.name}
                userID={users._id}
              />
            ))
          ) : (
            <p>No users available</p>
          )}
        </div>
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
