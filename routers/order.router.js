const express = require('express');
const router = express.Router();
const orderController = require('../Controllers/order.controller');
const setupCORS = require('../utils/setup-cors');
const controller = new orderController();
const {authenticateToken} = require('../utils/auth-middleware');
const {verifyAdminToken} = require("../utils/auth-middleware");

router.use(setupCORS.setupCORS);

router.get('/',verifyAdminToken, controller.getOrders);
router.post('/',authenticateToken,controller.createOrder);
router.get('/:id',authenticateToken,controller.getOrdersByUserID)
router.put('/:id',authenticateToken, controller.updateOrder);
router.delete('/:id',authenticateToken, controller.deleteOrder);

router.use(controller.errorNotFound);

module.exports = router;