import React, { useState, useEffect } from "react";
import "./Auth.css";
import { useDispatch, useSelector } from "react-redux";
import { loadUserAction, updateProfile } from "../../actions/UserAction";
import { useAlert } from "react-alert";

function UpdateProfile() {
  const [userData, setuserData] = useState({
    name: "",
    email: "",
  });

  const [avatar, setimage] = useState(null);
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, user } = useSelector((state) => state.user);
  const {
    loading: updateLoading,
    error: updateError,
    message,
  } = useSelector((state) => state.like);

  const reg_data = (event) => {
    const { value, name } = event.target;

    setuserData((previousValue) => {
      return {
        ...previousValue,
        [name]: value,
      };
    });
  };
  const { name, email } = userData;

  const submitForm = async (e) => {
    e.preventDefault();
    await dispatch(updateProfile(name, email, avatar));
    dispatch(loadUserAction());
  };

  const handleImageChange = async (e) => {
    const file = await e.target.files[0];

    const Reader = new FileReader();

    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setimage(Reader.result);
      }
    };
  };

  useEffect(() => {
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (updateError) {
      alert.error(updateError);
      dispatch({ type: "clearErrors" });
    }
  }, [dispatch, alert, error, message, updateError]);

  return (
    <>
      <div className="Login-box">
        {/* <img className="Login-box_logo" src="./logo.gif" alt="logo"></img> */}
        <div className="leftbox">
          <h1 className="Login-box__header">Profile</h1>

          <form method="POST">
            <div className="Login-box__form-content">
              <label>Full Name</label>
              <br></br>
              <input
                name="name"
                value={userData.name}
                type="text"
                placeholder={user.name}
                onChange={reg_data}
              />
            </div>
            <div className="Login-box__form-content">
              <label>E-mail</label>
              <br></br>
              <input
                value={userData.email}
                type="email"
                onChange={reg_data}
                name="email"
                placeholder={user.email}
              />
            </div>

            <div className="login-box__form-content">
              <label>Avatar</label>
              <br></br>
              <div className="avatar">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            </div>

            {/* <Link to="/login"> */}
            <button
              disabled={updateLoading}
              className="btn-login"
              type="submit"
              onClick={submitForm}
            >
              {updateLoading && updateLoading === true ? "Loading" : "Update"}
            </button>
            {/* </Link> */}
          </form>
        </div>
        {avatar === null ? (
          <div className="rightbox">
            <img src={user.avatar.url} alt="" />
          </div>
        ) : (
          <div className="rightbox">
            <img src={avatar} alt=""></img>
          </div>
        )}
      </div>
    </>
  );
}

export default UpdateProfile;
