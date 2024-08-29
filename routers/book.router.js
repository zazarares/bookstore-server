const express = require('express');
const router = express.Router();
const bookController = require('../Controllers/book.controller');
const setupCORS = require('../utils/setup-cors');
const {verifyAdminToken} = require("../utils/auth-middleware");

router.use(setupCORS.setupCORS);

router.get('/filter',bookController.filterBooks);
router.get('/filters',bookController.getFilters);
router.post('/',verifyAdminToken, bookController.createBook);
router.post('/bookList',bookController.getMultipleBooksById)
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

router.use(bookController.errorNotFound);

module.exports = router;