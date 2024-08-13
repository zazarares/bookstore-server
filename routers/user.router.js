const express = require('express');
const router = express.Router();
const userController = require('../Controllers/user.controller');
const setupCORS = require("../utils/setup-cors");
const controller = new userController();

router.use(setupCORS.setupCORS);

router.get('/', controller.getUsers);
router.get('/filter',controller.filterUsers);
router.get('/check/:username/:password',controller.CheckCredentials);
router.get('/:name', controller.getUserByUsername);
router.post('/', controller.createUser);
router.put('/:id', controller.updateUser);
router.delete('/:id', controller.deleteUser);

router.use(controller.errorNotFound);

module.exports = router;