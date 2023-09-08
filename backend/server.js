const app = require("./app");
const cloudinary = require("cloudinary");
const mongoose = require("mongoose");
const { Socket } = require("socket.io");

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

  // const io = require("socket.io")(server, {
  //   pingTimeout: 60000,
  //   cors: {
  //     origin: "http://localhost:3000",
  //   },
  // });

  // io.on("connection", (Socket) => {
  //   console.log("Connected to Socket.io");

  //   Socket.on("setup", (userData) => {
  //     Socket.join(userData._id);
  //     Socket.emit("connected");
  //   });

  //   Socket.on("join chat", (room) => {
  //     Socket.join(room);
  //     console.log("user joined room " + room);
  //   });

  //   Socket.on("new message", (newMessageReceived) => {
  //     if (!newMessageReceived) return;
  //     var chat = newMessageReceived.chat;

  //     if (!chat.users) return console.log("chat.user not defined");

  //     chat.users.forEach((user) => {
  //       if (user._id == newMessageReceived.sender._id) return;

  //       Socket.in(user._id).emit("message received", newMessageReceived);
  //     });
  //   });
  // });
});
