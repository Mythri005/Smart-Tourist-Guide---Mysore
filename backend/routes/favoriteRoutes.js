const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favoriteController');

// Get all favorites
router.get('/', favoriteController.getFavorites);

// Add to favorites
router.post('/', favoriteController.addFavorite);

// Remove from favorites
router.delete('/:id', favoriteController.removeFavorite);

module.exports = router;