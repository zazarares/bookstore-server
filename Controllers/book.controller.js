const bookService = require("../services/book.service");
const createFilter = require("../utils/create-filter");
const {urlToBook} = require("../utils/url-to-object");

const getFilters = async (req, res) => {
    try {
        const {filters} = createFilter.createFilter(req.query);
        const filterList = await bookService.getFilters(filters);
        res.status(200).json(filterList);
    } catch (err) {
        res.status(500).json("Internal Server Error");
    }
}


const getMultipleBooksById=async (req, res) => {
    try{
        const bookList=await bookService.getMultipleBooksById(req.body.order);
        res.status(200).json(bookList);

    }
    catch(err){
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
        const {filters, sortBy, sortOrder, limit, page, ok} = createFilter.createFilter(req.query);
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

const errorNotFound = (req, res) => {
    res.status(404).json({message: 'Not Found'});
}


module.exports = {
    getFilters,
    createBook,
    updateBook,
    deleteBook,
    filterBooks,
    getMultipleBooksById,
    errorNotFound
};
