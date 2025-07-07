const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Route to seed sample events
router.post('/seed', eventController.seedEvents);
// Add GET /seed for browser/test visibility
router.get('/seed', (req, res) => {
  res.status(200).json({ message: 'Seed endpoint is available. Use POST to seed events.' });
});
// Route to get all events
router.get('/', eventController.getEvents);
// Route to add a new event
router.post('/', eventController.addEvent);

module.exports = router;