import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Messages.css";
import MessageUser from "./MessageUser";
import { getAllUsers } from "../../actions/UserAction";
import { sendMessageAction } from "../../actions/chatAction";

export default function Messages() {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = React.useState("");
  const { users, loading } = useSelector((state) => state.allUsers);
  const { chatBox } = useSelector((state) => state.chatBox);
  const [messages, setMessages] = useState("");

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllUsers(name));
  };

  const onChangeHandler = (e) => {
    e.preventDefault();
    setMessages(e.target.value);
  };

  const messageSendHandler = async (e) => {
    e.preventDefault();
    await dispatch(sendMessageAction(messages, chatBox._id));
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
            <p className="message_user-list--na">No users available</p>
          )}
        </div>
      </div>
      <div className="chat-tab">
        <div className="friend-header">
          <div className="friend-header-img">
            {users && chatBox ? (
              <img src={chatBox.users[1].avatar.url} alt="" />
            ) : (
              <span></span>
            )}
          </div>
          <div className="name">
            {users && chatBox ? (
              <p className="friend-header-name">{chatBox.users[1].name}</p>
            ) : (
              <span></span>
            )}
          </div>
        </div>
        <div className="chat-window">{/* Show Messages Here  */}</div>
        <div className="chat-footer">
          <form className="sendMessage_form" action="">
            <div className="msg-box">
              <input
                type="text"
                value={messages}
                name="message"
                onChange={onChangeHandler}
                id=""
                placeholder="Start Typing ..."
              />
              {/* <button className="upload-img">
              <i className="bi bi-paperclip"></i>
            </button> */}
            </div>

            <button className="send-msg" onSubmit={messageSendHandler}>
              <i className="bi bi-send-fill"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
