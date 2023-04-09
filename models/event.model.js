const mongoose = require('mongoose');

const { Schema } = mongoose;

const eventSchema = new Schema({

  event_name: {
    type: String,
    required: true,

  },
  attendees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member',
  }],
  offering_name: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Offering',
  }],
  event_description: {
    type: String,
  },
  special_guests: [{
    type: String,
  }],
  guests: [{
    type: String,
  }],
  eventDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  eventTime: {
    type: Date,
    required: true,
    default: Date.now,
  },

}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
