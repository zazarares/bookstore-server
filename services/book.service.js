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
        console.log(filter);
        return await Book.find(filter);
    } catch (err) {
        console.error('Error retrieving Books:', err);
    }
};
const createBook = async (book) => {
    try {
        const SavedBook=new Book(book);
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
const getBookByFilters=async(filters,sortBy,sortOrder,limit,page) =>
{
    try{
        console.log((page-1)*limit)
        console.log(limit)
        return {book:await Book.find(filters).sort({ [sortBy]: sortOrder }).limit(limit).skip((page-1)*limit),
                bookNumber:await Book.countDocuments(filters).exec()};
    }
    catch (e) {

    }
}
const getFilters=async()=>
{
    try{
        return  {authors:await Book.aggregate([
            {
                $group: {
                    _id: '$author',
                    count: { $sum: 1 } // this means that the count will increment by 1
                }
            }
        ]), genres:await Book.aggregate([
                {
                    $group: {
                        _id: '$genre',
                        count: { $sum: 1 } // this means that the count will increment by 1
                    }
                }
            ]) }
    }
    catch (e) {

    }
}
module.exports = {getBooks, getBooksByName, createBook, updateBook, deleteBook,getBookByFilters,getFilters};