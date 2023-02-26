import React from "react";
import "./MainFeed.css";
import { Link } from "react-router-dom";

function Friends(props) {
  return (
    <>
      <div className="tile-2-child">
        <div className="side-box_friends">
          <h2>#Friends</h2>
          <Link className="friends_button">
            <img src={props.message} alt="" />
            <h4>Vishal Kumar Singh</h4>
          </Link>
          <Link className="friends_button">
            <img src={props.message} alt="" />
            <h4>Vishal Kumar Singh</h4>
          </Link>
          <Link className="friends_button">
            <img src={props.message} alt="" />
            <h4>Vishal Kumar Singh</h4>
          </Link>
          <Link className="friends_button">
            <img src={props.message} alt="" />
            <h4>Vishal Kumar Singh</h4>
          </Link>
          <Link className="friends_button">
            <img src={props.message} alt="" />
            <h4>Vishal Kumar Singh</h4>
          </Link>
          <Link className="friends_button">
            <img src={props.message} alt="" />
            <h4>Vishal Kumar Singh</h4>
          </Link>
          <Link className="friends_button">
            <img src={props.message} alt="" />
            <h4>Vishal Kumar Singh</h4>
          </Link>
          <Link className="friends_button">
            <img src={props.message} alt="" />
            <h4>Vishal Kumar Singh</h4>
          </Link>
          <Link className="friends_button">
            <img src={props.message} alt="" />
            <h4>Vishal Kumar Singh</h4>
          </Link>
          <Link className="friends_button">
            <img src={props.message} alt="" />
            <h4>Vishal Kumar Singh</h4>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Friends;
