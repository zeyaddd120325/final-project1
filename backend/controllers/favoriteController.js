const User = require('../models/User.js');

exports.getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('favorites');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.favorites || []);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addFavorite = async (req, res) => {
  try {
    const propertyId = req.params.propertyId;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!user.favorites) user.favorites = [];
    if (user.favorites.includes(propertyId)) {
      return res.status(400).json({ message: 'Property already in favorites' });
    }

    user.favorites.push(propertyId);
    await user.save();
    res.json({ message: 'Added to favorites', favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeFavorite = async (req, res) => {
  try {
    const propertyId = req.params.propertyId;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.favorites = user.favorites.filter(id => id.toString() !== propertyId);
    await user.save();
    res.json({ message: 'Removed from favorites', favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};