const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const ConnectDB = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("DB_LOG:Database connected!"))
    .catch((e) => console.log("DB_LOG:" + e.message));
};

module.exports = ConnectDB;
