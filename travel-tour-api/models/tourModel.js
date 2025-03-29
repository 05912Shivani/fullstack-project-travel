const mongoose = require('mongoose');
// Define the schema for the Tour model
const tourSchema = new mongoose.Schema(
  {
     // Unique numeric ID for each tour
    tour_id: {
      type: Number,
      required: true,// Must be provided
      unique: true,  // Ensures no duplicate tour IDs
    },
    title: {
      type: String,
      required: true,
    },
     // Description of the tour
    description: {
      type: String,
      required: true,
    },
     // Pick-up location for the tour
    pick_up: {
      type: String,
      required: true,
    },
      // Meeting point for the tour
    meeting_point: {
      type: String,
      required: true,
    },
     // Drop-off location after the tour ends
    drop_off: {
      type: String,
      required: true,
    },
     // Duration of the tour (numeric value)
    duration: {
      type: Number,
      required: true,
    },
    // Unit of the duration (must be one of 'days', 'hours', or 'weeks')
    duration_unit: {
      type: String,
      required: true,
      enum: ['days', 'hours', 'weeks'],  
    },
  },
  { timestamps: true }  // Automatically adds createdAt and updatedAt fields
);
// Create the Tour model using the schema
const Tour = mongoose.model('Tour', tourSchema);
// Export the model for use in other parts of the application
module.exports = Tour;
