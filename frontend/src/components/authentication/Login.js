import React, { useState, useEffect } from "react";
import "./Auth.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAction } from "../../actions/UserAction";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const [data, setdata] = useState({
    email: "",
    password: "",
  });

  const handleformOnchange = (event) => {
    const { value, name } = event.target;
    setdata({
      ...data,
      [name]: value,
    });
  };

  const { error, loading } = useSelector((state) => state.user);
  const { message } = useSelector((state) => state.like);

  const alert = useAlert();
  const navigate = useNavigate();

  const handleOnClick = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    await dispatch(loginUserAction(email, password));
    navigate("/");
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
  }, [alert, error, dispatch, message]);

  return (
    <>
      <div className="Login-box">
        <div className="leftbox">
          <img className="Login-box_logo" src="./logo.gif" alt="logo"></img>
          <h1 className="Login-box__header">Login</h1>
          <form>
            <div className="Login-box__form-content">
              <label>Email</label>
              <br></br>
              <input
                type="text"
                value={data.email}
                onChange={handleformOnchange}
                name="email"
                required
              ></input>
            </div>
            <div className="Login-box__form-content">
              <label>Password</label>
              <br></br>
              <input
                type="password"
                value={data.password}
                onChange={handleformOnchange}
                name="password"
                required
              ></input>
            </div>

            {loading ? (
              <button
                type="submit"
                className="btn-login"
                onClick={handleOnClick}
              >
                Please Wait...
              </button>
            ) : (
              <button
                type="submit"
                className="btn-login"
                onClick={handleOnClick}
              >
                Login
              </button>
            )}

            <p className="text-login">
              Don't have account ? <Link to="/register">register</Link>
            </p>
          </form>
        </div>
        <div className="rightbox">
          <img src="https://picsum.photos/200/?blur=4" alt="" />
          <div class="text">
            <span class="text-1">
              Every new friend is a <br></br>new adventure
            </span>
            <span class="text-2">Let's get connected</span>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
