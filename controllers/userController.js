const express = require('express');
const router = express.Router();
const { getLeaderboard, addUser, claimPoints } = require('../controllers/userController'); //

router.get('/', getLeaderboard); 
router.post('/', addUser);
router.put('/:userId/claim', claimPoints); 

module.exports = router; 