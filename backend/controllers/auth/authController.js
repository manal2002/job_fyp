const User = require("../../models/userModal");
const bcrypt = require("bcrypt");
let { objectId } = require("mongoose");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "something secret";

let successResponse = {
  status: 200,
  success: true,
  data: null,
  message: null,
};

let errorResponse = {
  status: 400,
  success: false,
  data: null,
  message: null,
};
module.exports = {
  register: (userData) => {
    return new Promise(async (resolve, reject) => {
      let { contact, email } = userData;
      contact = await User.findOne({ contact });
      email = await User.findOne({ email });
      if (email) {
        errorResponse.message =
          "User already exists with this usename or email";
        resolve(errorResponse);
      } else {
        let bcryptedPassword = await bcrypt.hash(userData.password, 10);

        userData.password = bcryptedPassword;
        const token = jwt.sign({ email }, JWT_SECRET, {
          expiresIn: "2h",
        });
        userData.token = token;

        await User.create(userData).then((result) => {
          if (result) {
            successResponse.data = result;
            resolve(successResponse);
          } else {
            resolve(errorResponse);
          }
        });
      }
    });
  },
  login: (userData) => {
    return new Promise(async (resolve, reject) => {
      const { email, password } = userData;

      const user = await User.findOne({ email });

      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ user_id: user._id, email }, JWT_SECRET, {
          expiresIn: "2h",
        });

        user.token = token;

        successResponse.data = user;
        resolve(successResponse);
      }
      resolve(errorResponse);
    });
  },
};
