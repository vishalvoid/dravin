// -- importing the app from app.js to use further to create the server and initialize.
const app = require("./app");

// -- listing the server from the port specified in environment variable
app.listen(process.env.PORT, () => {
  console.log(`Server Running on port ${process.env.PORT}`);
});
