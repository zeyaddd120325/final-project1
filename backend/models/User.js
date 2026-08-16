const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: { type: String, enum: ['customer', 'owner'], default: 'customer' },
  phone: { type: String, default: '' },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }] 
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);