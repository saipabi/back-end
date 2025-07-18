// controllers/userController.js

const User = require('../models/User');
const ClaimHistory = require('../models/ClaimHistory');

exports.getLeaderboard = async (req, res) => {
  try {
    const users = await User.find().sort({ totalPoints: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.addUser = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });

  const user = new User({ name });
  await user.save();
  res.status(201).json(user);
};

exports.claimPoints = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const randomPoints = Math.floor(Math.random() * 10) + 1;
    user.totalPoints += randomPoints;
    await user.save();

    const history = new ClaimHistory({
      userId: user._id,
      pointsClaimed: randomPoints,
    });
    await history.save();

    res.json({
      message: 'Points claimed successfully',
      user,
      newPoints: randomPoints,
    });
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.addUsersBulk = async (req, res) => {
  const usersToAdd = req.body;

  if (!Array.isArray(usersToAdd) || usersToAdd.length === 0) {
    return res.status(400).json({ msg: 'Request body must be an array of users.' });
  }

  const validUsers = [];
  const existingUserNames = new Set(
    (await User.find({ name: { $in: usersToAdd.map(u => u.name.trim()) } })).map(u => u.name)
  );

  for (const userData of usersToAdd) {
    const name = userData.name?.trim();
    if (name && !existingUserNames.has(name)) {
      validUsers.push({ name });
    }
  }

  if (validUsers.length === 0) {
    return res.status(400).json({ msg: 'No valid new users to add or all users already exist.' });
  }

  const newUsers = await User.insertMany(validUsers);
  res.status(201).json({ msg: `${newUsers.length} users added successfully.`, newUsers });
};
