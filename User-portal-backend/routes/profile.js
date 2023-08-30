const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Address = require('../models/Address'); // Import the Address model
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

// Get User Details
router.get('/user-details', verifyToken, async (req, res) => {
    try {
      const userId = req.user;
  
      const user = await User.findById(userId)
        .populate('addresses')
        .select('-password'); // Exclude password from the response
  console.log(user);
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred', error });
    }
  });
  

// Edit User Name
router.put('/edit-name', verifyToken, async (req, res) => {
  try {
    const userId = req.user;
    const newName = req.body.newName;

    await User.findByIdAndUpdate(userId, { name: newName });

    res.status(200).json({ message: 'User name updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
});

// Add or Edit Address
router.post('/add-edit-address', verifyToken, async (req, res) => {
  try {
    const userId = req.user;
    const { addressId, street, city, state, postalCode } = req.body;

    let address;

    if (addressId) {
      // Edit existing address
      address = await Address.findByIdAndUpdate(
        addressId,
        { street, city, state, postalCode },
        { new: true }
      );
    } else {
      // Add new address
      address = new Address({ street, city, state, postalCode });
      await address.save();
      await User.findByIdAndUpdate(userId, { $push: { addresses: address._id } });
    }

    res.status(200).json({ message: 'Address added/edited successfully', address });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
});

// Add or Edit Phone Number
router.post('/add-edit-phone', verifyToken, async (req, res) => {
  try {
    const userId = req.user;
    const newNumber = req.body.phoneNumber;

    await User.findByIdAndUpdate(userId, { name: newNumber });

    res.status(200).json({ message: 'Phone number added/edited successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
});

module.exports = router;
