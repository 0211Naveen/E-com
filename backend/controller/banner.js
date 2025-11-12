const Banner = require('../models/banner');
const path = require('path');
const fs = require('fs');



// Upload banner image
const uploadBannerImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }

        const banner = new Banner({
            filename: req.file.filename,
            path: `/bannerimages/${req.file.filename}`, // Path relative to static folder
            uploadDate: new Date(), // Optional: Track upload timestamp
        });

        const savedBanner = await banner.save();

        return res.status(201).json({
            message: 'Banner image uploaded successfully!',
            data: savedBanner,
        });
    } catch (error) {
        console.error('Error uploading banner image:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};






// Get all banner images
const getAllBanners = async (req, res) => {
    try {
        const banners = await Banner.find().sort({ uploadDate: -1 }); // Sort by latest upload first
        return res.status(200).json(banners);
    } catch (error) {
        console.error('Error fetching banner images:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};




// Delete banner by ID
const deleteBannerById = async (req, res) => {
    try {
        const banner = await Banner.findById(req.params.id);
        if (!banner) {
            return res.status(404).json({ error: 'Banner not found' });
        }

        // Delete the file from the server
        const filePath = path.join(__dirname, '..', banner.path);
        fs.unlink(filePath, (err) => {
            if (err) console.error('Error deleting file:', err);
        });

        await banner.deleteOne();
        res.status(200).json({ message: 'Banner deleted successfully!' });
    } catch (error) {
        console.error('Error deleting banner:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



module.exports = { uploadBannerImage,getAllBanners ,deleteBannerById };




