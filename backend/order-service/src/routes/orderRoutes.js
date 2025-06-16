const express = require('express');
const { getOrders, addOrder, cancelOrder } = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getOrders);
router.post('/', authMiddleware, addOrder);
router.patch('/:id/cancel', authMiddleware, cancelOrder);

module.exports = router;
