const express = require('express');
const router = express.Router();
const orderController = require('../Controllers/order.controller');
const setupCORS = require('../utils/setup-cors');
const {authenticateToken} = require('../utils/auth-middleware');

router.use(setupCORS.setupCORS);

router.post('/',authenticateToken,orderController.createOrder);
router.get('/user',authenticateToken,orderController.getOrdersByUserID);
router.get('/:id',authenticateToken, orderController.getOrderByID);
router.put('/:id',authenticateToken, orderController.updateOrder);
router.delete('/:id',authenticateToken, orderController.deleteOrder);

router.use(orderController.errorNotFound);

module.exports = router;