const express = require('express');
const router = express.Router();
const bookController = require('../Controllers/book.controller');
const setupCORS = require('../utils/setup-cors');
const controller = new bookController();

router.use(setupCORS.setupCORS);

router.get('/', controller.getBooks);
router.get('/filter',controller.filterBooks);
router.get('/filters',controller.getFilters);
router.get('/:name', controller.getBooksByName);
router.post('/', controller.createBook);
router.put('/:id', controller.updateBook);
router.delete('/:id', controller.deleteBook);

router.use(controller.errorNotFound);

module.exports = router;