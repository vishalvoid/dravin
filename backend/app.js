// -- importing express to create app
const express = require("express");

// -- importing dotenv to access enviroment variable
const dotenv = require("dotenv");

// -- specifying the path of dotenv file
dotenv.config({ path: "backend/config/config.env" });

// -- initializing the express app to use all the features.
const app = express();

const { connectDatabase } = require("./config/database");

connectDatabase();

// -- exporting the app.
module.exports = app;
