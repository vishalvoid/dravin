import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar(props) {
  const [tab, settab] = useState(window.location.pathname);
  return (
    <>
      <div className={`nav-area`}>
        {/* Header Section for logo and Heading  */}

        <div className="header">
          <div className="header__logo">
            <img src="/logo.gif" alt="" />
          </div>
          <h1 className="header__heading">Dravin</h1>
        </div>

        {/* divider section line  */}

        <div className="line"></div>

        {/* Navigation Buttons  */}

        <div className="nav--content">
          {/* -----Home-----  */}

          <Link className="text-link" to="/" onClick={() => settab("/")}>
            {tab === "/" ? (
              <div className="nav-clicked">
                <i className="bi bi-house-fill"></i>
                <p className="nav__heading">Home</p>
              </div>
            ) : (
              <div className="nav">
                <i className="bi bi-house"></i>
                <p className="nav__heading">Home</p>
              </div>
            )}
          </Link>

          {/* -----Search-----  */}

          <Link
            className="text-link"
            to="/search"
            onClick={() => settab("/search")}
          >
            {tab === "/search" ? (
              <div className="nav-clicked">
                <i className="bi bi-zoom-in"></i>
                <p className="nav__heading">Search</p>
              </div>
            ) : (
              <div className="nav">
                <i className="bi bi-search"></i>
                <p className="nav__heading">Search</p>
              </div>
            )}
          </Link>

          {/* -----Video Call-----  */}

          <Link
            className="text-link"
            to="/videocall"
            onClick={() => settab("/videocall")}
          >
            {tab === "/videocall" ? (
              <div className="nav-clicked">
                <i className="bi bi-person-video"></i>
                <p className="nav__heading">Video Call</p>
              </div>
            ) : (
              <div className="nav">
                <i className="bi bi-camera-video"></i>
                <p className="nav__heading">Video Call</p>
              </div>
            )}
          </Link>

          {/* -----Message-----  */}

          <Link
            className="text-link"
            to="/message"
            onClick={() => settab("/message")}
          >
            {tab === "/message" ? (
              <div className="nav-clicked">
                <i className="bi bi-chat-dots-fill"></i>
                <p className="nav__heading">Message</p>
              </div>
            ) : (
              <div className="nav">
                <i className="bi bi-chat"></i>
                <p className="nav__heading">Message</p>
              </div>
            )}
          </Link>
        </div>

        {/* Footer Section  */}

        <Link
          className="text-link"
          to="/account"
          onClick={() => settab("/user")}
        >
          <div className="nav__footer">
            <div className="profile__photo">
              <img src="./logo.gif" alt="" />
            </div>
            <div className="name">
              <p className="name__name">Vishal Kumar Singh</p>
              <button>Logout</button>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
export default Navbar;
