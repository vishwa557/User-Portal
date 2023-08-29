const express = require('express');
const multer = require('multer'); // For handling file uploads
const File = require('../models/File');
const verifyToken = require('../middleware/verifyToken');
const User = require('../models/User');

const router = express.Router();

// Set up Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// File upload route
router.post('/upload', verifyToken, upload.single('file'), async (req, res) => {
  try {
    // Get file data from the request
    const fileData = req.file;

    // Save the file data to the database
    const newFile = new File({
      filename: fileData.originalname,
      fileType: fileData.mimetype,
      dateUploaded: new Date(),
      user: req.user, 
      fileData: fileData.buffer,
    });

    

    await newFile.save();

    res.status(201).json({ message: 'File uploaded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
});

// File list route
router.get('/list', async (req, res) => {
  try {
    const files = await File.find({ user: req.user._id }); // Filter files by user
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
});

module.exports = router;
