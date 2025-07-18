const express = require('express');
const router = express.Router();
const User =require('../models/User');
const History = require('../models/ClaimHistory')

router.get('/users',async (req,res)=>{
    const users = await User.find().sort({totalPoints:-1});
    res.json(user)
});

// Seed initial 10 users (only use once)
router.post('/seed', async (req, res) => {
  const seedUsers = [
    'Rahul',
    'Kamal',
    'Sanak',
    'Meena',
    'Ravi',
    'Divya',
    'Arun',
    'Sneha',
    'Pooja',
    'Karthik'
  ];

  await User.deleteMany(); // Optional: clears old data

  const createdUsers = [];
  for (const name of seedUsers) {
    const user = new User({ name });
    await user.save();
    createdUsers.push(user);
  }

  res.json({
    message: '✅ Seeded 10 users successfully.',
    users: createdUsers,
  });
});

router.post('/users', async(req,res)=>{
    const {name} =req.body;
    const newUser = new User({name});
    await newUser.save();
    res.json(newUser)

});
router.post('/claim/:userId', async (req, res) => {
  const { userId } = req.params;
  const points = Math.floor(Math.random() * 10) + 1;
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  user.totalPoints += points;
  await user.save();

  const history = new History({ userId, name: user.name, points });
  await history.save();

  res.json({ points, total: user.totalPoints });
});

// Get claim history
router.get('/history', async (req, res) => {
  const history = await History.find().sort({ date: -1 });
  res.json(history);
});

module.exports = router;
