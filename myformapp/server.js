require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS Configuration
app.use(cors({
  origin: process.env.CLIENT_URL || 'https://sagarguptaportfolio.netlify.app/' // Ensure this is your Netlify URL in production
}));

// MongoDB Atlas connection string
const MONGO_URI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define schema
const Schema = mongoose.Schema;
const DataSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
});
const DataModel = mongoose.model('table', DataSchema, 'table');

// API endpoint to handle form submission
app.post('/submit', (req, res) => {
  const { name, email, phone, message } = req.body;
  const newData = new DataModel({ name, email, phone, message });

  newData.save()
    .then(() => res.status(200).json({ success: true }))
    .catch(err => {
      console.error('Error saving data:', err);
      res.status(400).json({ success: false, error: err.message });
    });
});

// Export for Vercel
module.exports = app;

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}
