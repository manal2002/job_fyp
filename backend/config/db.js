// const mongoose = require("mongoose");
// const dbUrl =
//   "mongodb+srv://manalzehra122:jobconnect@cluster0.dw4yk5r.mongodb.net/job_connect";

// mongoose.set("strictQuery", true);

// module.exports.connect = async () => {
//   try {
//     mongoose.set("strictQuery", false);
//     mongoose.connect(dbUrl);
//     console.log("Mongodb     Database connected");
//   } catch (error) {
//     console.log(error);

//     process.exit();

//   }
// };
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env file

const dbUrl = process.env.DB_URL;

mongoose.set("strictQuery", true);

module.exports.connect = async () => {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Database connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with an error
  }
};