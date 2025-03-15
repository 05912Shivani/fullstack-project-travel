const Tour = require('../models/tourModel');

// @desc    Get all tours
// @route   GET /tour
// @access  Public
const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    
    res.status(200).json({
      success: true,
      data: {
        tour_options: tours
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message || 'An unexpected error occurred'
    });
  }
};

// @desc    Create a new tour
// @route   POST /tour
// @access  Public
const createTour = async (req, res) => {
  try {
    const { tour_id, title, description, pick_up, meeting_point, drop_off, duration, duration_unit } = req.body;
    if (!tour_id || !title || !description || !pick_up || !meeting_point || !drop_off || !duration || !duration_unit) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }
    const newTour = new Tour({
      tour_id,
      title,
      description,
      pick_up,
      meeting_point,
      drop_off,
      duration,
      duration_unit
    });
    await newTour.save();

    res.status(201).json({
      success: true,
      message: 'Tour Created Successfully',
      data: newTour
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error creating tour',
      error: error.message || 'An unexpected error occurred'
    });
  }
};

// @desc    Update an existing tour
// @route   PUT /tour/:id
// @access  Public
const updateTour = async (req, res) => {
  try {
    const { title, description, pick_up, meeting_point, drop_off, duration, duration_unit } = req.body;

    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Tour not found'
      });
    }

    tour.title = title || tour.title;
    tour.description = description || tour.description;
    tour.pick_up = pick_up || tour.pick_up;
    tour.meeting_point = meeting_point || tour.meeting_point;
    tour.drop_off = drop_off || tour.drop_off;
    tour.duration = duration || tour.duration;
    tour.duration_unit = duration_unit || tour.duration_unit;

    await tour.save();

    res.status(200).json({
      success: true,
      message: `${tour.title} updated successfully`,
      data: tour
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error updating tour',
      error: error.message || 'An unexpected error occurred'
    });
  }
};

// @desc    Delete a tour
// @route   DELETE /tour/:id
// @access  Public
const deleteTour = async (req, res) => {
  try {
    const deletedTour = await Tour.findByIdAndDelete(req.params.id);

    if (!deletedTour) {
      return res.status(404).json({
        success: false,
        message: 'Tour not found'
      });
    }

    res.status(200).json({
      success: true,
      message: `${deletedTour.title} deleted successfully`,
      data: deletedTour
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error deleting tour',
      error: error.message || 'An unexpected error occurred'
    });
  }
};

module.exports = { getAllTours, createTour, updateTour, deleteTour };

