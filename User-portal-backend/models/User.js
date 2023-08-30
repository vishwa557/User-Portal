const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: String,
  addresses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Address' }],
  phoneNumber: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
