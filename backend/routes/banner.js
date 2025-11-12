// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const { uploadBannerImage } = require('../controller/banner');

// const router = express.Router();

// // Multer configuration for file uploads
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './bannerimages/'); // Save files in the `bannerimages/` directory
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname); // Unique filenames
//     },
// });

// const upload = multer({
//     storage,
//     limits: { fileSize: 2 * 1024 * 1024 }, // 2MB size limit
//     fileFilter: (req, file, cb) => {
//         if (!file.mimetype.startsWith('image/')) {
//             return cb(new Error('Only image files are allowed!'), false);
//         }
//         cb(null, true);
//     },
// });

// // Upload banner image
// router.post('/bannerimg', upload.single('image'), uploadBannerImage);

// // Get all banner images
// // router.get('/bannerimg', getAllBanners);

// module.exports = router;




const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { uploadBannerImage, getAllBanners, deleteBannerById} = require('../controller/banner');

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, '../bannerimages');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Set up storage for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); //timestamp to the filename
    }
});

// Initialize multer
const upload = multer({ storage: storage });
router.post('/bannerimg', upload.single('image'), uploadBannerImage);


//  // get banner by ID
 router.get('/bannerimg', getAllBanners); 

// DELETE: Delete banner by ID
router.delete('/bannerimg/:id', deleteBannerById);

module.exports = router;
