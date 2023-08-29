const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
// const userRoutes = require('./routes/user');
const fileRoutes = require('./routes/file');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://vishwachandra557:Harsha1718@cluster-1.7xdanga.mongodb.net/userportal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.use('/api/auth', authRoutes);
// app.use('/api/user', userRoutes);
app.use('/api/file', fileRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
