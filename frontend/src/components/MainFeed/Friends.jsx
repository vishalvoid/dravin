import React from "react";
import "./MainFeed.css";
import { Link } from "react-router-dom";

function Friends({ userID, name, avatar }) {
  return (
    <div>
      <Link to={`/user/${userID}`} className="friends_button">
        <img src={avatar} alt="" />
        <h4>{name}</h4>
      </Link>
    </div>
  );
}

export default Friends;
