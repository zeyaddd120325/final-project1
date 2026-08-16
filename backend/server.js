const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/properties', require('./routes/propertyRoutes'));
app.use('/api/favorites', require('./routes/favoriteRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.use('/api/stats', require('./routes/statsRoutes'));
console.log('statsRoutes loaded');

app.get('/', (req, res) => {
  res.send('StayFinder API is running ');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});