const express = require('express');
const { updateProfile } = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

router.put('/profile', auth, updateProfile);

module.exports = router;