// index.js
require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const mailchimp = require('./mailchimp'); // Import your Mailchimp configuration
const cors = require('cors');
const app = express();

app.use(express.json());

// List of allowed origins
const allowedOrigins = [
  'https://stoic-application-frontend-himanshus-projects-1bbbfa97.vercel.app',
  'https://stoic-application-frontend.vercel.app/',
];

const corsOptions = {
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  
};

app.use(cors(corsOptions));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Define your routes here
app.use('/api/subscribers', require('./routes/subscribers'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
