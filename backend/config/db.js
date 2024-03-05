const mongoose = require("mongoose");
const dbUrl =
  "mongodb+srv://manalzehra122:jobconnect@cluster0.dw4yk5r.mongodb.net/job_connect";

mongoose.set("strictQuery", true);

module.exports.connect = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(dbUrl);
    console.log("Mongodb     Database connected");
  } catch (error) {
    console.log(error);

    process.exit();

  }
};
