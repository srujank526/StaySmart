const mongoose = require('mongoose');
const validator = require('validator');

const houseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'House must belong to a user'],
  },
  title: {
    type: String,
    required: [true, 'A house must have a title'],
  },
  address: {
    street: { type: String, required: [true, 'Street is required'] },
    houseNumber: { type: String, required: [true, 'House number is required'] },
    zip: { type: String, required: [true, 'ZIP code is required'] },
    city: { type: String, required: [true, 'City is required'] },
    state: { type: String, required: [true, 'State is required'] },
    country: { type: String, required: [true, 'Country is required'] },
  },
  rentAmount: {
    type: Number,
    required: [true, 'Please provide a rent amount'],
    min: [0, 'Rent amount cannot be negative'],
  },
  description: {
    type: String,
    trim: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
  
  const House = mongoose.model('House', houseSchema);
  
  module.exports = House;
  