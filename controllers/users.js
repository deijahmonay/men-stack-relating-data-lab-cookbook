const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.get('/', async (req, res) => {
  const allUsers = await User.find({})
  res.render('users/index.ejs', {
      allUsers
  })
})

router.get('/:userId', async (req, res) => {
  const user = await User.findById(req.params.userId)
  res.render('users/show.ejs', {
      user
  })
})
module.exports = router;