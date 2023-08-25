const mongoose = require('mongoose');

const ChartSchema = new mongoose.Schema({
  userID: {
    type: String,
    lowercase: true,
    trim: true
  },
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  userName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required:true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    trim: true
  },
  otp: {
    type: String,
    trim: true
  },
  verify: {
    type: Boolean,
    default: false
  },
  avatar: String,
  country: String
});

const Chart = mongoose.model('Chart', ChartSchema);

module.exports = Chart;