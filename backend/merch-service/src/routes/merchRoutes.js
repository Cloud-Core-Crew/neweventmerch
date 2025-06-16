const express = require('express');
const router = express.Router();
const merchController = require('../controllers/merchController');

// Route to add merchandise
router.post('/merch', merchController.addMerch);

// Route to get all merchandise
router.get('/merch', merchController.getAllMerch);

// Route to seed sample merchandise
router.post('/merch/seed', merchController.seedMerch);

module.exports = router;