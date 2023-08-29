const jwt = require('jsonwebtoken');
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());


const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    console.log("token not present in cookie" );
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, 'SECRET_KEY');
    req.user = decoded.userId;
    // console.log(req.user)
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = verifyToken;