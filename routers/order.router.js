const express = require('express');
const router = express.Router();
const orderController = require('../Controllers/order.controller');
const setupCORS = require('../utils/setup-cors');
const controller = new orderController();

router.use(setupCORS.setupCORS);

router.get('/', controller.getOrders);
router.post('/', controller.createOrder);
router.put('/:id', controller.updateOrder);
router.delete('/:id', controller.deleteOrder);

router.use(controller.errorNotFound);

module.exports = router;