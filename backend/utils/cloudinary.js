const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME || "dxtk0tc0g",
  api_key: process.env.CLOUDINARY_API_KEY || "684998419493583",
  api_secret:
    process.env.CLOUDINARY_API_SECRET || "wxMlpeYNO5Qvt_w50z4rbltFxEE",
});

module.exports = { cloudinary };
