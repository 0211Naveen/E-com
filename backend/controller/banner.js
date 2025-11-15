


const Banner = require('../models/banner');
const cloudinary = require('../config/cloudinary');

// ✅ Upload banner image
const uploadBannerImage = async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ error: 'No image uploaded' });
    }

    const banner = new Banner({
      url: req.file.path, // Cloudinary-hosted URL
      public_id: req.file.filename, // Cloudinary public ID
      uploadDate: new Date(),
    });

    const savedBanner = await banner.save();

    return res.status(201).json({
      message: '✅ Banner image uploaded successfully!',
      data: savedBanner,
    });
  } catch (error) {
    console.error('Error uploading banner:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// ✅ Get all banners
const getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ uploadDate: -1 });
    return res.status(200).json(banners);
  } catch (error) {
    console.error('Error fetching banners:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// ✅ Delete banner from Cloudinary + DB
const deleteBannerById = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) {
      return res.status(404).json({ error: 'Banner not found' });
    }

    // ✅ Delete from Cloudinary
    if (banner.public_id) {
      await cloudinary.uploader.destroy(banner.public_id);
    }

    await banner.deleteOne();

    res.status(200).json({ message: '🗑️ Banner deleted successfully!' });
  } catch (error) {
    console.error('Error deleting banner:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { uploadBannerImage, getAllBanners, deleteBannerById };


