const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

const router = express.Router();

// Sign-up route
router.post(
  '/signup',
  [
    body('email').isEmail().withMessage('Invalid email'),
    body('phoneNumber')
    .isLength({ min: 10, max: 10 }).withMessage('Phone number must be 10 digits')
    .isNumeric().withMessage('Phone number must consist of numbers only'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters')
      .matches(/\d/)
      .withMessage('Password must contain at least one digit')
      .matches(/[a-z]/)
      .withMessage('Password must contain at least one lowercase letter')
      .matches(/[A-Z]/)
      .withMessage('Password must contain at least one uppercase letter')
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage('Password must contain at least one special character'),
    body('name').notEmpty().withMessage('Name is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, name, phoneNumber } = req.body;

    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new User({
        email,
        password: hashedPassword,
        name,
        phoneNumber,
      });

      await newUser.save();

      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred', error });
    }
  }
);

// Login route
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
    
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        const validPassword = await bcrypt.compare(password, user.password);
    
        if (!validPassword) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
    
        const token = jwt.sign({ userId: user._id }, 'SECRET_KEY', { expiresIn: '1h' });

      res.json({ token , message:'Login successfull'});
    } catch (error) {
      res.status(500).json({ message: 'An error occurred', error });
    }
  }
);

module.exports = router;

