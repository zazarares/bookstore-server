const Book = require("./Book");
const getBooks = async () => {
    try {
        return await Book.find();
    } catch (err) {
        console.error('Error retrieving Books:', err);
    }
};
const getBooksByName = async (filter={}) => {
    try {
        return await Book.find(filter);
    } catch (err) {
        console.error('Error retrieving Books:', err);
    }
};
const createBook = async (book) => {
    console.log("book:"+book)
    return;
    const savedBook=new Book(book.name,book.author,book.year,book.genre,book.genre,book.price);
    try{
        savedBook.save();
    }
    catch(err){
        console.error('Error retrieving Books:', err);
    }
}
module.exports = {getBooks,getBooksByName,createBook};