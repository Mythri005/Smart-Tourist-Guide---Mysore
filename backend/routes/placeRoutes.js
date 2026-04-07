const express = require('express');
const router = express.Router();
const placeController = require('../controllers/placeController');

// Get all places
router.get('/', placeController.getAllPlaces);

// Search places
router.get('/search', placeController.searchPlaces);

// Get place by ID
router.get('/:id', placeController.getPlaceById);

module.exports = router;