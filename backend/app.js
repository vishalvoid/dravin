//  IMPORTING
const express = require("express");
const dotenv = require("dotenv");
const Post = require("./routes/PostRoutes");

// -- specifying the path of dotenv file
dotenv.config({ path: "backend/config/config.env" });

// -- initializing the express app to use all the features.
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// initializing the first user route.
app.use("/api/v1", Post);

// -- exporting the app.
module.exports = app;
