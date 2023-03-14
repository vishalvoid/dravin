const app = require("./app");
const { connectDatabase } = require("./config/database");
const cloudinary = require("cloudinary");

// connecting to database function.
connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// -- listing the server from the port specified in environment variable
app.listen(process.env.PORT, () => {
  console.log(`Server Running on port ${process.env.PORT}`);
});
