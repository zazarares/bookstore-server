const bookService = require("../services/book.service");
const createFilter=require("../utils/create-filter");
class BookController {
    constructor() {

    }

    async getBooksByName(req, res) {
        try {
            const bookList = await bookService.getBooksByName({name: req.params.name});
            res.status(200).json(bookList);
        } catch (err) {
            res.status(500).json("Internal Server Error");
        }
    }

    async getBooks(req, res) {
        try {
            const bookList = await bookService.getBooks();
            res.status(200).json(bookList);
        } catch (err) {
            res.status(500).json("Internal Server Error");
        }
    }

    async createBook(req, res) {
        try {
            const book = {
                name: req.body.name,
                author: req.body.author,
                year: req.body.year,
                genre: req.body.genre,
                price: req.body.price,
            };
            await bookService.createBook(book);
            res.status(201).json({message: "Book Created Successfully\nBook: ", book: book});
        } catch (err) {
            res.status(500).json("Internal Server Error");
        }
    }

    async updateBook(req, res) {
        try {
            await bookService.updateBook(req.params.id, {
                name: req.body.name,
                author: req.body.author,
                year: req.body.year,
                genre: req.body.genre,
                price: req.body.price,
            });
            res.status(200).json({
                message: `Book with id ${req.params.id} was updated successfully`, book: {
                    name: req.body.name,
                    author: req.body.author,
                    year: req.body.year,
                    genre: req.body.genre,
                    price: req.body.price,
                }
            });
        } catch (err) {
            res.status(500).json(`Could not update book with id ${req.params.id}`);
        }
    }

    async deleteBook(req, res) {
        try {
            await bookService.deleteBook(req.params.id);
            res.status(200).json(`Deleted book with id ${req.params.id}`);
        } catch (err) {
            res.status(500).json(`Could not delete book with id ${req.params.id}`);
        }
    }

    async filterBooks(req, res) {
        {
            const {filters,sortBy,sortOrder,limit,ok}=createFilter.createFilter(req,"book");
            if(!ok)
            {
                res.status(500).json("invalid parameters");
                return;
            }

            //console.log(f);
            try {
                const filteredBooks = (await bookService.getBookByFilters(filters,sortBy,sortOrder,limit));
                res.status(200).json(filteredBooks);
            } catch (err) {
                res.status(500).json(`Could not delete book with id ${req.params.id}`);
            }
        }
    }

    errorNotFound(req, res) {
        res.status(404).json({message: 'Not Found'});
    }
}



module.exports = BookController;