const Book = require("../model/Book");
const getBooks = async () => {
    try {
        return await Book.find();
    } catch (err) {
        console.error('Error retrieving Books:', err);
    }
};
const getBooksByName = async (filter = {}) => {
    try {
        return await Book.find(filter);
    } catch (err) {
        console.error('Error retrieving Books:', err);
    }
};
const getMultipleBooksById = async (idList) => {
    try {
        return await Book.find({"_id": {$in: idList}}).exec();
    } catch (err) {
        console.error('Error retrieving Books:', err);
    }
};
const createBook = async (book) => {
    try {
        const SavedBook = new Book(book);
        SavedBook.save();
    } catch (err) {
        console.error('Error retrieving Books:', err);
    }
}
const updateBook = async (id, book) => {
    try {
        await Book.findByIdAndUpdate(id, book, {new: true}).exec();
    } catch (err) {
        console.log("Error")
    }
}
const deleteBook = async (id) => {
    try {
        await Book.findByIdAndDelete(id, {new: true}).exec();
    } catch (err) {
        console.log("Error")
    }
}
const getBookByFilters = async (filters, sortBy, sortOrder, limit, page) => {
    try {
        return {
            book: await Book.find(filters).sort({[sortBy]: sortOrder}).limit(limit).skip((page - 1) * limit),
            bookNumber: await Book.countDocuments(filters).exec()
        };
    } catch (e) {

    }
}
const getFilters = async (filter) => {
    try {
        const authorFilter = {...filter};
        delete authorFilter.author;
        const genreFilter = {...filter};
        delete genreFilter.genre;
        return {
            authors: await Book.aggregate([
                {$match: authorFilter},
                {
                    $group: {
                        _id: '$author',
                        count: {$sum: 1}
                    }
                },
                {$sort: {_id: 1}}
            ]), genres: await Book.aggregate([
                {$match: genreFilter},
                {
                    $group: {
                        _id: '$genre',
                        count: {$sum: 1} // this means that the count will increment by 1
                    }
                },
                {$sort: {_id: 1}} // Sort alphabetically by author
            ])
        }
    } catch (e) {

    }
}
const createIDList = (books) => {
    let bookIDs = [];
    for (let item of books) {
        bookIDs.push(item.book_id);
    }
    return bookIDs;
}
const addBookDetails = (bookList,orderedBooks) => {
    const finalBookList = [];
    let totalPrice=0;
    for (let book of bookList) {
        const currBook = book;
        const matchedBook = orderedBooks.find(item => item.book_id === currBook._id.toString());
        if (matchedBook) {
            const bookPrice = currBook.price * matchedBook.quantity;
            totalPrice += bookPrice;

            finalBookList.push({
                book_id: currBook._id,
                price: currBook.price,
                quantity: matchedBook.quantity,
                name: currBook.name,
            });
        }
    }
    return {finalBookList,totalPrice};
}
const getOrderedBooksByID = async (books) => {
    try {

        let bookIDs = createIDList(books);
        const bookList = await getMultipleBooksById(bookIDs);
        return addBookDetails(bookList,books)

    } catch (error) {

    }
};
const updateQuantities = async (books) => {
    try {
        // Prepare an array of update operations
        const operations = books.map(book => ({
            updateOne: {
                filter: {_id: book.book_id},  // Filter to match the book
                update: {$inc: {quantity: -book.quantity}},  // Decrease the quantity
            }
        }));

        return await Book.bulkWrite(operations);  // Optional: Return the result of the bulkWrite operation
    } catch (error) {
        console.error('Error updating book quantities:', error);
        throw error;  // Optional: Propagate the error if needed
    }
};


module.exports = {
    getBooks,
    getBooksByName,
    createBook,
    updateBook,
    deleteBook,
    getBookByFilters,
    getFilters,
    updateQuantities,
    getOrderedBooksByID,
    getMultipleBooksById
};