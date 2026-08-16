const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: String, enum: ['single', 'shared'], required: true },
  description: { type: String, required: true },
  images: { type: [String], default: [] },
  amenities: { type: [String], default: [] },
  
  furnished: { type: Boolean, default: false },
  availableFrom: { type: Date, default: Date.now },

  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isNew: { type: Boolean, default: true },
  views: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Property', PropertySchema);