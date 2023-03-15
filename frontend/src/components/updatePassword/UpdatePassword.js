import React, { useState, useEffect } from "react";
import "./updatePassword.css";

import { useDispatch, useSelector } from "react-redux";
import { loadUserAction, updatePassword } from "../../actions/UserAction";
import { useAlert } from "react-alert";

function UpdatePassword() {
  const [data, setdata] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleformOnchange = (event) => {
    const { value, name } = event.target;
    setdata({
      ...data,
      [name]: value,
    });
  };

  const dispatch = useDispatch();
  const alert = useAlert();

  const { user } = useSelector((state) => state.user);
  const { error, loading, message } = useSelector((state) => state.like);

  const handleOnClick = async (e) => {
    e.preventDefault();
    const { oldPassword, newPassword } = data;
    await dispatch(updatePassword(oldPassword, newPassword));
    dispatch(loadUserAction());
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }

    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, alert, message]);

  return (
    <>
      <div className="Login-box">
        <div className="leftbox">
          <img
            className="Login-box_logo"
            src={user.avatar.url}
            alt="logo"
          ></img>
          <h1 className="Login-box__header">Password</h1>
          <form>
            <div className="Login-box__form-content">
              <label>Current Password</label>
              <br></br>
              <input
                type="password"
                value={data.oldPassword}
                onChange={handleformOnchange}
                name="oldPassword"
                required
              ></input>
            </div>
            <div className="Login-box__form-content">
              <label> New Password</label>
              <br></br>
              <input
                type="password"
                value={data.newPassword}
                onChange={handleformOnchange}
                name="newPassword"
                required
              ></input>
            </div>

            <button type="submit" className="btn-login" onClick={handleOnClick}>
              {loading && loading === true ? "Please Wait..." : "Update"}
            </button>
          </form>
        </div>
        <div className="rightbox">
          <img
            src="https://res.cloudinary.com/dv6m4bm7w/image/upload/v1678526835/abstract-luxury-gradient-blue-background-smooth-dark-blue-with-black-vignette-studio-banner_1258-108740_bifhb5.avif"
            alt=""
          />
          <div class="text">
            <span class="text-1">
              I changed my password to "incorrect"<br></br> So when i forget, My
              computer tell me
            </span>
            <span class="text-2">"your password is incorrect"</span>
          </div>
        </div>
      </div>
    </>
  );
}
export default UpdatePassword;
