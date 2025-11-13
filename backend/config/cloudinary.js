const cloudinary = require('cloudinary').v2;
require('dotenv').config(); // load .env if needed

// ✅ Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Export so other files can use it
module.exports = cloudinary;
