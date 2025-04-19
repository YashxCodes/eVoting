// routes/admin.js
const express = require('express');
const router = express.Router();
const Topic = require('../models/Topic');
const { ensureAuthenticated, ensureAdmin } = require('../helpers/auth');

// Admin dashboard: List topics with options to view results.
router.get('/dashboard', ensureAuthenticated, ensureAdmin, async (req, res) => {
  try {
    const topics = await Topic.findAll();
    res.render('adminDashboard', { user: req.user, topics });
  } catch (error) {
    console.error(error);
    res.send('Error fetching topics');
  }
});

// Render page to create a voting topic.
router.get('/create-topic', ensureAuthenticated, ensureAdmin, (req, res) => {
  res.render('createTopic');
});

// Handle topic creation. Options are entered as a comma-separated string.
router.post('/create-topic', ensureAuthenticated, ensureAdmin, async (req, res) => {
  const { title, options } = req.body;
  // Convert the comma-separated string into an array of objects.
  const optionsArray = options.split(',').map(opt => ({ option: opt.trim(), count: 0 }));
  try {
    await Topic.create({ title, options: optionsArray });
    res.redirect('/admin/dashboard');
  } catch (error) {
    console.error(error);
    res.redirect('/admin/create-topic');
  }
});

// View results for a topic.
router.get('/results/:id', ensureAuthenticated, ensureAdmin, async (req, res) => {
  try {
    const topic = await Topic.findOne({ where: { id: req.params.id } });
    res.render('results', { topic });
  } catch (error) {
    console.error(error);
    res.send('Error fetching results');
  }
});

module.exports = router;