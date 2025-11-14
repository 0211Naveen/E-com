
// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const { uploadBannerImage, getAllBanners, deleteBannerById} = require('../controller/banner');

// // Ensure the uploads directory exists
// const uploadsDir = path.join(__dirname, '../bannerimages');
// if (!fs.existsSync(uploadsDir)) {
//     fs.mkdirSync(uploadsDir, { recursive: true });
// }

// // Set up storage for multer
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, uploadsDir);
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + path.extname(file.originalname)); //timestamp to the filename
//     }
// });

// // Initialize multer
// const upload = multer({ storage: storage });
// router.post('/bannerimg', upload.single('image'), uploadBannerImage);


// //  // get banner by ID
//  router.get('/bannerimg', getAllBanners); 

// // DELETE: Delete banner by ID
// router.delete('/bannerimg/:id', deleteBannerById);

// module.exports = router;



const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary'); // ✅ Cloudinary config
const { uploadBannerImage, getAllBanners, deleteBannerById } = require('../controller/banner');

// ✅ Configure Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'antique-banners', // Folder name in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
  },
});

// ✅ Initialize multer with Cloudinary storage
const upload = multer({ storage });

// ✅ Routes
router.post('/bannerimg', upload.single('image'), uploadBannerImage);
router.get('/bannerimg', getAllBanners);
router.delete('/bannerimg/:id', deleteBannerById);

module.exports = router;
