const User = require('../models/User');
const Property = require('../models/Property');

exports.getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProperties = await Property.countDocuments();
    const totalViews = await Property.aggregate([
      { $group: { _id: null, total: { $sum: '$views' } } }
    ]);

    const recentProperties = await Property.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('ownerId', 'name');

    res.json({
      totalUsers,
      totalProperties,
      totalViews: totalViews.length > 0 ? totalViews[0].total : 0,
      recentProperties,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};