const User = require('../models/User.js');

exports.updateProfile = async (req, res) => {
  try {
    const { name, phone } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (name) user.name = name;
    if (phone) user.phone = phone;

    await user.save();
    res.json({
      message: 'Profile updated',
      user: { id: user._id, name: user.name, email: user.email, type: user.type, phone: user.phone }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};