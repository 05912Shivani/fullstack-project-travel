const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema(
  {
    tour_id: {
      type: Number,
      required: true,
      unique: true,  
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    pick_up: {
      type: String,
      required: true,
    },
    meeting_point: {
      type: String,
      required: true,
    },
    drop_off: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    duration_unit: {
      type: String,
      required: true,
      enum: ['days', 'hours', 'weeks'],  
    },
  },
  { timestamps: true }  
);

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
