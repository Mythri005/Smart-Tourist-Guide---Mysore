const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

// Get restaurants near a place
router.get('/near/:placeId', restaurantController.getRestaurantsByPlace);

module.exports = router;