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

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserAction());
  }, []);

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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
