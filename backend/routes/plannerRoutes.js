const express = require('express');
const router = express.Router();
const plannerController = require('../controllers/plannerController');

// Get itinerary for a place
router.get('/itinerary/:placeId', plannerController.getItinerary);

module.exports = router;