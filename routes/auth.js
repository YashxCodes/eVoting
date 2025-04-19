// routes/auth.js
const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');

// Render login page
router.get('/login', (req, res) => {
  res.render('login');
});

// Handle login using Passport's local strategy.
router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/voter/dashboard',
    failureRedirect: '/auth/login'
  })
);

// Render signup page
router.get('/signup', (req, res) => {
  res.render('signup');
});

// Handle signup data
router.post('/signup', async (req, res) => {
  const { username, password, role } = req.body; // role is either 'admin' or 'voter'
  try {
    // Create new user
    await User.create({ username, password, role: role || 'voter' });
    res.redirect('/auth/login');
  } catch (error) {
    console.error(error);
    res.redirect('/auth/signup');
  }
});

// Logout route
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

module.exports = router;