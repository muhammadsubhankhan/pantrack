const mongoose = require('mongoose');

const { Schema } = mongoose;

const memberSchema = new Schema({

  suffix: {
    type: String,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  Ministry: {
    type: String,
  },
  dob: {
    type: Date,
  },
  member_function: {
    type: String,
  },
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now,
  },

}, { timestamps: true });


module.exports = mongoose.model('Member', memberSchema);
