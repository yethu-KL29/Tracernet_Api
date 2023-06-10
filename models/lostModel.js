const mongoose = require('mongoose');
const multer = require('multer');

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Define the user schema
const lostSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true
  },
  address: {
    type: String,
    // required: true
  },
  location: {
    type: String,
    // required: true
  },
  contactNumber: {
    type: String,
    // required: true
  },
  image: {
    type: String,
    required: true
  }
});

// Create and export the user model
const Lost = mongoose.model('Lost', lostSchema);

module.exports = {
  Lost,
  upload
};
