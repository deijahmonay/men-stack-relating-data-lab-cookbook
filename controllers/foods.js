const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.get('/new', (req, res) => {
  res.render('foods/index.ejs')
});


module.exports = router;

