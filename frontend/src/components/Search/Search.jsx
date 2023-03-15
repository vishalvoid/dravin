import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../actions/UserAction";
import User from "../MainFeed/Friends";
import "./Search.css";

const Search = () => {
  const [name, setName] = React.useState("");

  const { users, loading } = useSelector((state) => state.allUsers);

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllUsers(name));
  };

  return (
    <div className="search">
      <form className="searchForm" onSubmit={submitHandler}>
        <h1 style={{ padding: "2vmax" }}>Search</h1>

        <input
          type="text"
          value={name}
          placeholder="Name"
          required
          onChange={(e) => setName(e.target.value)}
        />

        <button className="searchbtn" disabled={loading} type="submit">
          Search
        </button>

        <div className="searchResults">
          {users &&
            users.map((user) => (
              <div className="gap">
                <User
                  key={user._id}
                  userId={user._id}
                  name={user.name}
                  avatar={user.avatar.url}
                />
              </div>
            ))}
        </div>
      </form>
    </div>
  );
};

export default Search;
