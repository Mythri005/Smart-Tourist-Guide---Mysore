const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');

// Get hotels near a place
router.get('/near/:placeId', hotelController.getHotelsByPlace);

module.exports = router;