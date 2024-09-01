// index.js
require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const mailchimp = require('./mailchimp'); // Import your Mailchimp configuration
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors({
  origin: 'https://stoic-application-frontend-himanshus-projects-1bbbfa97.vercel.app', // Correct URL without trailing slash
}));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Define your routes here
app.use('/api/subscribers', require('./routes/subscribers'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
