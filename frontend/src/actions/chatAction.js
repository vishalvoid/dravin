import axios from "axios";

export const createChatAction = (userID) => async (dispatch) => {
  try {
    dispatch({
      type: "ChatBoxRequest",
      loading: true,
    });

    const { data } = await axios.post(
      "/api/v1/chatbox",
      {
        userID,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    dispatch({
      type: "ChatBoxSuccess",
      payload: data.chatbox,
      loading: false,
    });
  } catch (error) {
    dispatch({
      type: "ChatBoxFailure",
      payload: error.response.data.message,
      loading: false,
    });
  }
};

export const sendMessageAction = (content, chatId) => async (dispatch) => {
  console.log(content, chatId);
  try {
    dispatch({
      type: "SendMessageRequest",
    });

    const { data } = await axios.post(
      "/api/v1/send/message",
      {
        content,
        chatId,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    dispatch({
      type: "SendMessageSuccess",
      payload: data.message,
      loading: false,
    });
  } catch (error) {
    dispatch({
      type: "SendMessageFailure",
      payload: error.response.data.message,
      loading: false,
    });
  }
};

export const fetchMessageRequest = (chatId) => async (dispatch) => {
  try {
    dispatch({
      type: "fetchMessageRequest",
      loading: true,
    });

    const { data } = await axios.get(
      `/api/v1/fetchmessage/${chatId}`,

      {
        headers: { "Content-Type": "application/json" },
      }
    );

    dispatch({
      type: "fetchMessageSuccess",
      payload: data.message,
      loading: false,
    });
  } catch (error) {
    dispatch({
      type: "fetchMessageFailure",
      payload: error.response.data.message,
      loading: false,
    });
  }
};
