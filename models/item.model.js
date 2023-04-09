const mongoose = require('mongoose');

const { Schema } = mongoose;

const itemSchema = new Schema({

  item_name: {
    type: String,
    required: true,
  },
  item_description: {
    type: String,

  },
  item_quantity: {
    type: Number,
    required: true,
  },
  dateAdded: {
    type: Date,
    required: true,
    default: Date.now,
  },

}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);
