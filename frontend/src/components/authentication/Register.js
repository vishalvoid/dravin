import React, { useState } from "react";
import "./Auth.css";
import { Link } from "react-router-dom";

function Register() {
  const [userData, setuserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const reg_data = (event) => {
    const { value, name } = event.target;

    setuserData((previousValue) => {
      return {
        ...previousValue,
        [name]: value,
      };
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="Login-box">
        <img className="Login-box_logo" src="./logo.gif" alt="logo"></img>
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

          {/* <Link to="/login"> */}
          <button className="btn-login" type="submit" onClick={submitForm}>
            Register
          </button>
          {/* </Link> */}
          <p className="text-login">
            Already have account ? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Register;
