const express = require('express');
const { getFavorites, addFavorite, removeFavorite } = require('../controllers/favoriteController.js');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, getFavorites);
router.post('/:propertyId', auth, addFavorite);
router.delete('/:propertyId', auth, removeFavorite);

module.exports = router;