const mongoose = require("mongoose");

const mongoDB = process.env.DB_URL.replace(
  "<PASSWORD>",
  process.env.DB_PASSWORD
);
exports.connectDatabase = async () => {
  mongoose.set("strictQuery", true);
  await mongoose
    .connect(mongoDB, { useNewUrlParser: true })
    .then((con) => console.log(`Database Connected : ${con.connection.host}`))
    .catch((error) => {
      console.log(error);
    });
};
