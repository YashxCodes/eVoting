// routes/voter.js
const express = require('express');
const router = express.Router();
const Topic = require('../models/Topic');
const Vote = require('../models/Vote');
const { ensureAuthenticated } = require('../helpers/auth'); // We'll add this helper shortly

// Voter dashboard: List all available topics.
router.get('/dashboard', ensureAuthenticated, async (req, res) => {
  try {
    const topics = await Topic.findAll();
    res.render('voterDashboard', { user: req.user, topics });
  } catch (error) {
    console.error(error);
    res.send('Error fetching topics');
  }
});

// Handle voting on a topic
router.post('/vote/:id', ensureAuthenticated, async (req, res) => {
  const topicId = req.params.id;
  const selectedOption = req.body.option;
  try {
    const topic = await Topic.findOne({ where: { id: topicId } });
    if (topic) {
      let options = topic.options; // Array: [{ option: "A", count: 0 }, ...]
      const idx = options.findIndex(opt => opt.option === selectedOption);
      if (idx > -1) {
        options[idx].count += 1;
        await topic.update({ options });
      }
    }
    // Optionally record the vote in the Vote table.
    await Vote.create({ userId: req.user.id, topicId: topicId, votedOption: selectedOption });
    res.redirect('/voter/dashboard');
  } catch (error) {
    console.error(error);
    res.redirect('/voter/dashboard');
  }
});

module.exports = router;