const express = require('express');
const Tour = require('../models/tourModel');  
const router = express.Router();

/**
 * @swagger
 * /tour:
 *   get:
 *     tags:
 *       - Default  
 *     description: Get all tours or a single tour by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: false
 *         description: The ID of the tour to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved tours
 *       404:
 *         description: Tour not found
 *       500:
 *         description: Error fetching tours
 */
// Route to get all tours or a specific tour by ID (optional)
router.get('/:id?', async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      const tour = await Tour.findById(id);
      if (!tour) {
        return res.status(404).json({
          success: false,
          message: `Tour with ID ${id} has been deleted and cannot be found anymore.`
        });
      }
      // Check if the tour was updated within the last minute
      if (tour.updatedAt && new Date() - new Date(tour.updatedAt) <= 60000) { // 1 minute
        return res.status(200).json({
          success: true,
          message: `Tour with ID ${id} was successfully updated.`,
          data: { tour_options: [tour] }
        });
      }

      return res.status(200).json({
        success: true,
        data: { tour_options: [tour] }
      });
    }
 // If no ID is provided, return all tours
    const tours = await Tour.find();
    res.status(200).json({
      success: true,
      data: { tour_options: tours }
    });
  } catch (err) {
    console.error('Error fetching tours:', err);
    res.status(500).json({
      success: false,
      message: 'Error fetching tours',
      error: err.message || 'An unexpected error occurred'
    });
  }
});

/**
 * @swagger
 * /tour:
 *   post:
 *     tags:
 *       - Default  
 *     description: Create a new tour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tour_id
 *               - title
 *               - description
 *               - pick_up
 *               - meeting_point
 *               - drop_off
 *               - duration
 *               - duration_unit
 *             properties:
 *               tour_id:
 *                 type: integer
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               pick_up:
 *                 type: string
 *               meeting_point:
 *                 type: string
 *               drop_off:
 *                 type: string
 *               duration:
 *                 type: integer
 *               duration_unit:
 *                 type: string
 *                 enum:
 *                   - days
 *                   - hours
 *                   - weeks
 *     responses:
 *       201:
 *         description: Tour created successfully
 *       400:
 *         description: Bad request - Invalid data
 *       500:
 *         description: Internal server error
 */
// Route to create a new tour
router.post('/', async (req, res) => {
  try {
    const { tour_id, title, description, pick_up, meeting_point, drop_off, duration, duration_unit } = req.body;
// Ensure all required fields are provided
    if (!tour_id || !title || !description || !pick_up || !meeting_point || !drop_off || !duration || !duration_unit) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }
 // Check if a tour with the same ID already exists
    const existingTour = await Tour.findOne({ tour_id });
    if (existingTour) {
      return res.status(400).json({
        success: false,
        message: `Tour with tour_id ${tour_id} already exists`
      });
    }
 // Create a new tour instance
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
// Save the new tour to the database
    const savedTour = await newTour.save();
    res.status(201).json({
      success: true,
      message: 'Tour Created Successfully',
      data: savedTour
    });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({
      success: false,
      message: 'Error creating tour',
      error: err.message || 'An unexpected error occurred'
    });
  }
});


/**
 * @swagger
 * /tour/{id}:
 *   put:
 *     tags:
 *       - Default
 *     summary: Update an existing tour by ID
 *     description: Modify an existing tour using its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the tour to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - pick_up
 *               - meeting_point
 *               - drop_off
 *               - duration
 *               - duration_unit
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               pick_up:
 *                 type: string
 *               meeting_point:
 *                 type: string
 *               drop_off:
 *                 type: string
 *               duration:
 *                 type: integer
 *               duration_unit:
 *                 type: string
 *                 enum:
 *                   - days
 *                   - hours
 *                   - weeks
 *     responses:
 *       200:
 *         description: Tour updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Tour Title updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     tour_id:
 *                       type: integer
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     pick_up:
 *                       type: string
 *                     meeting_point:
 *                       type: string
 *                     drop_off:
 *                       type: string
 *                     duration:
 *                       type: integer
 *                     duration_unit:
 *                       type: string
 *       404:
 *         description: Tour not found
 *       500:
 *         description: Internal server error
 */
// Route to update an existing tour by ID
router.put('/:id', async (req, res) => {
  try {
    const { title, description, pick_up, meeting_point, drop_off, duration, duration_unit } = req.body;
    // Find the tour by ID
    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Tour not found'
      });
    }
     // Update the tour fields only if new values are provided
    tour.title = title || tour.title;
    tour.description = description || tour.description;
    tour.pick_up = pick_up || tour.pick_up;
    tour.meeting_point = meeting_point || tour.meeting_point;
    tour.drop_off = drop_off || tour.drop_off;
    tour.duration = duration || tour.duration;
    tour.duration_unit = duration_unit || tour.duration_unit;
// Save the updated tour details
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
});



/**
 * @swagger
 * /tour/{id}:
 *   delete:
 *     tags:
 *       - Default  
 *     description: Delete an existing tour by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the tour to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tour deleted successfully
 *       404:
 *         description: Tour not found
 */
router.delete('/:id', async (req, res) => {
  try {
     // Find and delete the tour
    const deletedTour = await Tour.findByIdAndDelete(req.params.id);

    if (!deletedTour) {
      return res.status(404).json({
        success: false,
        message: 'Tour not found'
      });
    }

    res.status(200).json({
      success: true,
      message: `${deletedTour.title} deleted successfully. Tour cannot be found anymore.`
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Error deleting tour',
      error: err.message || 'An unexpected error occurred'
    });
  }
});
// Export the router so it can be used in the main application
module.exports = router;
