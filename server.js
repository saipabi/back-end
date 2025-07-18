const express = require('express');
const mongoose = require('mongoose'); // Import mongoose
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
require('dotenv').config(); // <-- This is the missing line!

const app = express();

app.use(express.json()); // Body parser
app.use(cors());

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => {
  console.error('MongoDB connection error:', err); // Better error logging
  
});

app.use('/api/users', userRoutes); // Use the correct path for your user routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));