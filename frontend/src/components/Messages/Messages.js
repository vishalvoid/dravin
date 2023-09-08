import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Messages.css";
import { getAllUsers } from "../../actions/UserAction";
import {
  fetchMessageRequest,
  sendMessageAction,
} from "../../actions/chatAction";
import ScrollableChat from "./ScrollableChat";
// import io from "socket.io-client";
import { createChatAction } from "../../actions/chatAction";
import Loader from "../../Loader/Loader";

// const ENDPOINT = "http://localhost:4000";
// var socket, selectedChatCompare;

export default function Messages() {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = React.useState("");
  const { users } = useSelector((state) => state.allUsers);
  const { chatBox } = useSelector((state) => state.chatBox);
  const [messages, setMessages] = useState("");
  const { fetchMessage, loading } = useSelector((state) => state.fetchMessage);
  const [chatLoading, setchatLoading] = useState(false);
  // const [socketConnected, setSocketconnected] = useState(false);
  const { sendMessage } = useSelector((state) => state.sendMessage);
  const [chatMessage, setchatMessage] = useState([]);

  // useEffect(() => {
  //   socket = io(ENDPOINT);
  //   socket.emit("setup", user);
  //   socket.on("connection", () => setSocketconnected(true));
  // }, []);

  const accessChat = async (userID) => {
    setchatLoading(true);
    await dispatch(createChatAction(userID));
  };

  const fetchChat = async () => {
    if (!chatBox) return;
    dispatch(fetchMessageRequest(chatBox._id));
    // setchatMessage(fetchMessage);
    setchatLoading(false);
    // socket.emit("join chat", chatBox._id);
  };

  // useEffect(() => {
  //   socket.on("message received", (newMessageReceived) => {
  //     if (
  //       !selectedChatCompare ||
  //       selectedChatCompare._id !== newMessageReceived.chat._id
  //     ) {
  //     } else {
  //       // setchatMessage([...chatMessage, newMessageReceived]);
  //     }
  //   });
  // });

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllUsers(name));
  };

  const onChangeHandler = (e) => {
    e.preventDefault();
    setMessages(e.target.value);
  };

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    fetchChat();
    setchatMessage(fetchMessage);
  }, [chatBox]);

  const messageSendHandler = async (e) => {
    e.preventDefault();
    await dispatch(sendMessageAction(messages, chatBox._id));

    setMessages("");
    await dispatch(fetchMessageRequest(chatBox._id));
    // setchatMessage([...chatMessage, fetchMessage]);
    // await socket.emit("new message", sendMessage.message);
  };

  // console.log(chatMessage);

  return (
    <div className="container-msg">
      <div className="user-tab">
        <div className="user-header">
          <p>Messages</p>
          <i className="bi bi-gear-fill"></i>
        </div>
        <div className="search-bar">
          <form className="search-form" action="" onSubmit={submitHandler}>
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
              <div className="user-name">
                <div className="dp">
                  <img src={users.avatar.url} alt="avatar" />
                </div>
                <div
                  className="content"
                  onClick={async () => await accessChat(users._id)}
                >
                  <p className="Name">{users.name}</p>
                  <p className="R-msg">Rescent Message</p>
                </div>
              </div>
            ))
          ) : (
            <p className="message_user-list--na">No users available</p>
          )}
        </div>
      </div>
      {chatBox ? (
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
          <div className="chat-window">
            {!chatLoading ? (
              <ScrollableChat messages={fetchMessage} />
            ) : (
              <span className="loader-message">
                <Loader />
              </span>
            )}
          </div>
          <div className="chat-footer">
            <form
              className="sendMessage_form"
              action=""
              onSubmit={messageSendHandler}
            >
              <input
                className="msg-box"
                type="text"
                value={messages}
                name="message"
                onChange={onChangeHandler}
                id=""
                placeholder="Start Typing ..."
              />
              <button className="send-msg" type="submit">
                <i className="bi bi-send-fill"></i>
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="chat-tab">
          <p className="chat-not-selected">
            {" "}
            Please Select any User to Start Chatting
          </p>
        </div>
      )}
    </div>
  );
}
