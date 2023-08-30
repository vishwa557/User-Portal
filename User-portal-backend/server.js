const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const fileRoutes = require('./routes/file');
const portalRoutes = require('./routes/portalDetails');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://vishwachandra557:Harsha1718@cluster-1.7xdanga.mongodb.net/userportal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/file', fileRoutes);
app.use('/api/', portalRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
