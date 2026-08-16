const express = require('express');
const {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty
} = require('../controllers/propertyController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/', getProperties);
router.get('/:id', getPropertyById);

router.post('/', auth, upload.array('images', 5), createProperty);
router.put('/:id', auth, upload.array('images', 5), updateProperty);
router.delete('/:id', auth, deleteProperty);

module.exports = router;