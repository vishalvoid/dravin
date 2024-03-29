//  IMPORTING
const express = require("express");
const dotenv = require("dotenv");
const Post = require("./routes/PostRoutes");
const User = require("./routes/UserRoutes");
const Chat = require("./routes/MessageRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const Message = require("./routes/SendMessageRoutes");

// -- specifying the path of dotenv file
dotenv.config({ path: "backend/config/config.env" });

// -- initializing the express app to use all the features.
const app = express();

// Middleware
// app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
// app.use(cors({ origin: "https://www.dravin.cf", credentials: true }));
app.use(cors({ credentials: true }));

// initializing the first user route.
app.use("/api/v1", Post);
app.use("/api/v1", User);
app.use("/api/v1", Chat);
app.use("/api/v1", Message);

//static files
app.use(express.static(path.join(__dirname, ".././frontend/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, ".././frontend/build/index.html"));
});

// -- exporting the app.
module.exports = app;
