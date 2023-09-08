const app = require("./app");
// const { connectDatabase } = require("./config/database");
const cloudinary = require("cloudinary");
const mongoose = require("mongoose");
// const { connectDatabase } = require("./config/database");

// connecting to database function.

const mongoDB = process.env.DB_URL.replace(
  "<PASSWORD>",
  process.env.DB_PASSWORD
);

const connectDatabase = async () => {
  mongoose.set("strictQuery", true);
  await mongoose
    .connect(mongoDB, { useNewUrlParser: true })
    .then((con) => console.log(`Database Connected : ${con.connection.host}`))
    .catch((error) => {
      console.log(error);
    });
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// -- listing the server from the port specified in environment variable
connectDatabase().then(() => {
  const server = app.listen(process.env.PORT, () => {
    console.log(`Server Running on port ${process.env.PORT}`);
  });

  const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:3000",
    },
  });

  io.on("connection", () => {
    console.log("Connected to Socket.io");
  });
});
