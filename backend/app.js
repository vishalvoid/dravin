//  IMPORTING
const express = require("express");
const dotenv = require("dotenv");
const Post = require("./routes/PostRoutes");
const User = require("./routes/UserRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// -- specifying the path of dotenv file
dotenv.config({ path: "backend/config/config.env" });

// -- initializing the express app to use all the features.
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(cors({ credentials: true }));

// initializing the first user route.
app.use("/api/v1", Post);
app.use("/api/v1", User);

// -- exporting the app.
module.exports = app;
