const express = require('express');
const router = express.Router();
const userController = require('../Controllers/user.controller');
const authController=require('../Controllers/auth.controller');
const setupCORS = require("../utils/setup-cors");
const controller = new userController();
const authenticationController=new authController();
const {authenticateToken} = require('../utils/auth-middleware');
const {verifyAdminToken} = require("../utils/auth-middleware");
router.use(setupCORS.setupCORS);

router.get('/',verifyAdminToken, controller.getUsers);
router.get('/filter',verifyAdminToken,controller.filterUsers);
router.get('/check/:username/:password',authenticationController.CheckCredentials);
router.get('/:name',verifyAdminToken, controller.getUserByUsername);
router.post('/', controller.createUser);
router.put('/:id',authenticateToken, controller.updateUser);
router.delete('/:id',authenticateToken, controller.deleteUser);

router.use(controller.errorNotFound);

module.exports = router;