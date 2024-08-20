const express = require('express');
const router = express.Router();
const userController = require('../Controllers/user.controller');
const setupCORS = require("../utils/setup-cors");
const {CheckCredentials}=require('../Controllers/auth.controller');
const {authenticateToken} = require('../utils/auth-middleware');
const {verifyAdminToken} = require("../utils/auth-middleware");
router.use(setupCORS.setupCORS);

router.get('/',verifyAdminToken, userController.getUsers);
router.get('/filter',verifyAdminToken,userController.filterUsers);
router.post('/login/',CheckCredentials);
router.get('/:name',verifyAdminToken, userController.getUserByUsername);
router.post('/', userController.createUser);
router.put('/:id',authenticateToken, userController.updateUser);
router.delete('/:id',authenticateToken, userController.deleteUser);

router.use(userController.errorNotFound);

module.exports = router;