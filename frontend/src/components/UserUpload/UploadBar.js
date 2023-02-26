import React from "react";
import "./UploadBar.css";
export default function UploadBar(props) {
  return (
    <>
      <div className={`mainUB ${props.theme}`}>
        <div className="UB">
          <figure className="userImg">
            <img src="https://picsum.photos/200/300" alt="avatar" />
          </figure>
        </div>
        <div className="col-3">
          <input
            className="effect-1"
            type="text"
            placeholder="what&#39;s happening?"
            size={50}
          />
          <span className="focus-border"></span>
        </div>
        <div className="post-area">
          <i className="bi bi-image"></i>
        </div>
        <div className="post-area">
          <button id="post-button">Post</button>
        </div>
      </div>
    </>
  );
}
