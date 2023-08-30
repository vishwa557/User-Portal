const express = require('express');
const File = require('../models/File');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

// Portal details route
router.get('/portal-details', verifyToken, async (req, res) => {
  try {
    const totalFilesUploaded = await File.countDocuments();
    
    const fileTypeCounts = await File.aggregate([
      {
        $group: {
          _id: '$fileType',
          count: { $sum: 1 }
        }
      }
    ]);

    const filesUploadedByUser = await File.aggregate([
      { $group: { _id: '$user', count: { $sum: 1 } } }
    ]);

    res.status(200).json({
      totalFilesUploaded,
      fileTypeCounts,
      filesUploadedByUser
    });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
});

module.exports = router;
