const express = require('express');
const router = express.Router();
const User = require('../models/user.js'); 

router.get('/', async (req, res) => { 
  const allUsers = await User.find({})
  res.render('users/index.ejs', {
      allUsers
  })
})

router.get('/:userId', async (req, res) => { // display one user by id
  const user = await User.findById(req.params.userId) // find user by id
  res.render('users/show.ejs', { //render user/show.ejs, pass to template
      user // send user ti the view
  })
})
module.exports = router;