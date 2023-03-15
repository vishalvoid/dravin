const mongoose = require("mongoose");

const mongoDB = process.env.DB_URL.replace(
  "<PASSWORD>",
  process.env.DB_PASSWORD
);
exports.connectDatabase = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(mongoDB, { useNewUrlParser: true })
    .then((con) => console.log(`Database Connected : ${con.connection.host}`))
    .catch((error) => {
      console.log(error);
    });
};
