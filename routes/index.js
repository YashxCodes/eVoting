// routes/index.js
const express = require('express');
const router = express.Router();

// Home page: Render the landing page.
router.get('/', (req, res) => {
  res.render('home', { user: req.user });
});

module.exports = router;