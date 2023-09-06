import axios from "axios";

export const createChatAction = (userID) => async (dispatch) => {
  try {
    console.log({ userID });

    dispatch({
      type: "ChatBoxRequest",
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
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "ChatBoxFailure",
      payload: error.response.data.message,
    });
  }
};
