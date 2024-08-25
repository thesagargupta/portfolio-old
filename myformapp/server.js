const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Atlas connection string
const uri = 'mongodb+srv://sagarkshn8:Sagar123@cluster0.bw0dr.mongodb.net/form';

mongoose.connect(uri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Define schema
const Schema = mongoose.Schema;
const DataSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
});

// Create model for 'table' collection in the specified database
const DataModel = mongoose.model('table', DataSchema, 'table');

// API endpoint to handle form submission
app.post('/submit', (req, res) => {
  const { name, email, phone, message } = req.body;
  const newData = new DataModel({ name, email, phone, message});

  newData.save()
    .then(() => res.status(200).json({ success: true }))
    .catch(err => res.status(400).json({ success: false, error: err }));
});

app.get('/', (req, res) => {
  res.send({

    activeStatus:true,
    error:false,

  })
})


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
