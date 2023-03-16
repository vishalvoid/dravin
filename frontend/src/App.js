import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { loadUserAction } from "./actions/UserAction";
import "./App.css";
import Account from "./components/Account/Account";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import Home from "./components/MainFeed/Home";
import Navigation from "./components/Navigation/Navbar";
import Search from "./components/Search/Search";
import TestComponent from "./components/testComponent/TestComponent";
import UpdatePassword from "./components/updatePassword/UpdatePassword";
import UpdateProfile from "./components/updateProfile/updateProfile";
import UserProfile from "./components/UserProfile/UserProfile";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserAction());
  }, [dispatch]);

  document.body.style.backgroundColor = "#f4f4f1";

  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <Router>
      {isAuthenticated && <Navigation />}

      <Routes>
        <Route
          exact
          path="/"
          element={isAuthenticated ? <Home /> : <Login />}
        />
        <Route
          exact
          path="/account"
          element={isAuthenticated ? <Account /> : <Login />}
        />
        <Route
          exact
          path="/update/profile"
          element={isAuthenticated ? <UpdateProfile /> : <Login />}
        />
        <Route
          exact
          path="/update/password"
          element={isAuthenticated ? <UpdatePassword /> : <Login />}
        />
        <Route
          exact
          path="/user/:id"
          element={isAuthenticated ? <UserProfile /> : <Login />}
        />
        <Route
          exact
          path="/search"
          element={isAuthenticated ? <Search /> : <Login />}
        />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route path="*" element={<TestComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
