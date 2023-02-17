const app = require("./app");
const { connectDatabase } = require("./config/database");

// connecting to database function.
connectDatabase();

// -- listing the server from the port specified in environment variable
app.listen(process.env.PORT, () => {
  console.log(`Server Running on port ${process.env.PORT}`);
});
