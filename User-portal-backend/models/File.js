const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  fileType: { type: String, required: true },
  dateUploaded: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fileData: { type: Buffer, required: true },
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
