// const mongoose = require('mongoose');

// const bannerSchema = new mongoose.Schema({
//     filename: { type: String, required: true },
//     path: { type: String, required: true },
//     uploadDate: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model('Banner', bannerSchema);


const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    url: { type: String, required: true },       // Cloudinary image URL
    public_id: { type: String, required: true }, // Cloudinary public ID
    uploadDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Banner', bannerSchema);
