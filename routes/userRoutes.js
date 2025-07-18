// routes/userRoutes.js
const express = require('express');
const router = express.Router();

const {
  getLeaderboard,
  addUser,
  claimPoints,
  addUsersBulk
} = require('../controllers/userController');


router.get('/', getLeaderboard);
router.post('/', addUser);
router.put('/:userId/claim', claimPoints);
router.post('/bulk', addUsersBulk);

module.exports = router;
