import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { loadUserAction } from "./actions/UserAction";
import "./App.css";
import Account from "./components/Account/Account";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import Home from "./components/MainFeed/Home";
import Navigation from "./components/Navigation/Navbar";
import UpdatePassword from "./components/updatePassword/UpdatePassword";
import UpdateProfile from "./components/updateProfile/updateProfile";
import UserProfile from "./components/UserProfile/UserProfile";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserAction());
  }, []);

  document.body.style.backgroundColor = "#f4f4f1";

  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <>
      {isAuthenticated && <Navigation />}

      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
        <Route
          path="/account"
          element={isAuthenticated ? <Account /> : <Login />}
        />
        <Route
          path="/update/profile"
          element={isAuthenticated ? <UpdateProfile /> : <Login />}
        />
        <Route
          path="/update/password"
          element={isAuthenticated ? <UpdatePassword /> : <Login />}
        />
        <Route
          path="/user/:id"
          element={isAuthenticated ? <UserProfile /> : <Login />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
