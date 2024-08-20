const express = require('express');
const router = express.Router();
const bookController = require('../Controllers/book.controller');
const setupCORS = require('../utils/setup-cors');

router.use(setupCORS.setupCORS);

router.get('/', bookController.getBooks);
router.get('/filter',bookController.filterBooks);
router.get('/filters',bookController.getFilters);
router.get('/:name', bookController.getBooksByName);
router.post('/', bookController.createBook);
router.put('/updateQuantity',bookController.updateQuantities);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

router.use(bookController.errorNotFound);

module.exports = router;