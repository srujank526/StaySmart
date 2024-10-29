const mongoose = require('mongoose')

const houseSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: true
    },
    address: {
      street: String,
      houseNumber: String,
      zip: String,
      city: String,
      state: String,
      country: String
    },
    rentAmount: {
      type: Number,
      required: true
    },
    description: {
      type: String,
    },
    isAvailable: {
      type: Boolean,
      default: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  
  const House = mongoose.model('House', houseSchema);
  
  module.exports = House;
  