import React, { useState, useEffect } from "react";
import "./Auth.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUserAction } from "../../actions/UserAction";
import { useAlert } from "react-alert";

function Register() {
  const [userData, setuserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [image, setimage] = useState(null);
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error } = useSelector((state) => state.user);

  const reg_data = (event) => {
    const { value, name } = event.target;

    setuserData((previousValue) => {
      return {
        ...previousValue,
        [name]: value,
      };
    });
  };
  const { name, email, password } = userData;
  const submitForm = async (e) => {
    e.preventDefault();
    if (image) {
      dispatch(registerUserAction(name, email, password, image));
    } else {
      dispatch(registerUserAction(name, email, password));
    }
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
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
  }, [dispatch, alert, error]);

  return (
    <>
      <div className="Login-box">
        {/* <img className="Login-box_logo" src="./logo.gif" alt="logo"></img> */}
        <div className="leftbox">
          <h1 className="Login-box__header">Register</h1>

          <form method="POST">
            <div className="Login-box__form-content">
              <label>Full Name</label>
              <br></br>
              <input
                name="name"
                value={userData.name}
                type="text"
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
              />
            </div>
            <div className="Login-box__form-content">
              <label>Password</label>
              <br></br>
              <input
                type="password"
                value={userData.password}
                onChange={reg_data}
                name="password"
              />
            </div>
            <div className="Login-box__form-content">
              <label>Confirm password</label>
              <br></br>
              <input
                type="password"
                value={userData.confirmPassword}
                onChange={reg_data}
                name="confirmPassword"
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
              disabled={loading}
              className="btn-login"
              type="submit"
              onClick={submitForm}
            >
              {loading && loading === true ? "Please Wait..." : "Register"}
            </button>
            {/* </Link> */}
            <p className="text-login">
              Already have account ? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
        {image === null ? (
          <div className="rightbox">
            <img src="https://picsum.photos/200/300/?blur=5" alt="" />
            <div class="text">
              <span class="text-1">
                Every new friend is a <br></br>new adventure
              </span>
              <span class="text-2">Let's get connected</span>
            </div>
          </div>
        ) : (
          <div className="rightbox">
            <img src={image} alt=""></img>
          </div>
        )}
      </div>
    </>
  );
}

export default Register;
