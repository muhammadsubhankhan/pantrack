const mongoose = require('mongoose');

const { Schema } = mongoose;

const offeringSchema = new Schema({

  offering_name: {
    type: String,
    required: true,
  },
  N_and_C: [{
    type: Number,
  }],
  Amount: {
    type: Number,

  },
  dateAdded: {
    type: Date,
    required: true,
    default: Date.now,
  },

}, { timestamps: true });

module.exports = mongoose.model('offering', offeringSchema);
