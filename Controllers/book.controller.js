const bookService = require("../services/book.service");
const createFilter = require("../utils/create-filter");
const {urlToBook} = require("../utils/url-to-object");

const getFilters = async (req, res) => {
    try {
        const bookList = await bookService.getFilters();
        res.status(200).json(bookList);
    } catch (err) {
        res.status(500).json("Internal Server Error");
    }
}

const getBooksByName = async (req, res) => {
    try {
        const bookList = await bookService.getBooksByName({name: req.params.name});
        res.status(200).json(bookList);
    } catch (err) {
        res.status(500).json("Internal Server Error");
    }
}

const getBooks = async (req, res) => {
    try {
        const bookList = await bookService.getBooks();
        res.status(200).json(bookList);
    } catch (err) {
        res.status(500).json("Internal Server Error");
    }
}

const createBook = async (req, res) => {
    try {

        const book = urlToBook(req);
        await bookService.createBook(book);
        res.status(201).json({message: "Book Created Successfully\nBook: ", book: book});
    } catch (err) {
        res.status(500).json("Internal Server Error");
    }
}

const updateBook = async (req, res) => {
    try {
        await bookService.updateBook(req.params.id, urlToBook(req));
        res.status(200).json({
            message: `Book with id ${req.params.id} was updated successfully`, book: urlToBook(req)
        });
    } catch (err) {
        res.status(500).json(`Could not update book with id ${req.params.id}`);
    }
}

const deleteBook = async (req, res) => {
    try {
        await bookService.deleteBook(req.params.id);
        res.status(200).json(`Deleted book with id ${req.params.id}`);
    } catch (err) {
        res.status(500).json(`Could not delete book with id ${req.params.id}`);
    }
}

const filterBooks = async (req, res) => {
    {
        const {filters, sortBy, sortOrder, limit, page, ok} = createFilter.createFilter(req, "book", true);
        if (!ok) {
            res.status(500).json("invalid parameters");
            return;
        }
        try {
            const filteredBooks = (await bookService.getBookByFilters(filters, sortBy, sortOrder, limit, page));
            res.status(200).json(filteredBooks);
        } catch (err) {
            res.status(500).json(`Could not delete book with id ${req.params.id}`);
        }
    }
}

const updateQuantities = async (req, res) => {
    try {
        const bookList = req.body.bookList;
        console.log(bookList);
        for (let i = 0; i < bookList.length; i++) {
            await bookService.updateQuantities(bookList[i]._id, bookList[i].quantity);
        }
        res.status(200);
    } catch (err) {
        res.status(500).json(`Could not delete book with id ${req.params.id}`);
    }
}

const errorNotFound = (req, res) => {
    res.status(404).json({message: 'Not Found'});
}


module.exports = {
    getFilters,
    getBooksByName,
    getBooks,
    createBook,
    updateBook,
    deleteBook,
    filterBooks,
    updateQuantities,
    errorNotFound
};
