const BookDBManager = require("./BookDBManager");
const {StringDecoder} = require('string_decoder');

class BookstoreServerController {
    constructor() {
    }

    setupCORS(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'x-ijt, Content-Type, Authorization'); // Include x-ijt
        res.setHeader('Access-Control-Allow-Credentials', true);
    }

    async decodeBody(req) {
        const decoder = new StringDecoder('utf-8');
        let body = '';
        req.on('data', chunk => {
            body += decoder.write(chunk);
            console.log("body:" + body)
        });
        req.on('end', () => {
            body += decoder.end();
            console.log("body end:" + body)
            return JSON.parse(body);
        });
        console.log("body final:" + body)
        return "";

    }


    getNameFromURL(url) {
        let bookName = url.split('/')[2];
        bookName = bookName.replaceAll("%20", " ");
        return bookName;
    }

    async getBooksByName(res, bookName) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        const bookList = await BookDBManager.getBooksByName({name: bookName});
        res.end(JSON.stringify(bookList));
    }

    async getBooks(res) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        const bookList = await BookDBManager.getBooks();
        res.end(JSON.stringify(bookList));
    }

    async createBook(req, res, book) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        console.log(book);
        await BookDBManager.createBook(book);
    }

    errorNotFound(res) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('404 Not Found\n');
    }

    async createBookstoreServerController(req, res, book) {
        //Setup CORS
        this.setupCORS(req, res);
        switch (req.method) {
            case 'OPTIONS':
                res.writeHead(204);
                res.end();
                break;
            case 'GET':
                if (req.url.startsWith("/book/")) {
                    this.getBooksByName(res, this.getNameFromURL(req.url));
                } else if (req.url === '/book') {
                    this.getBooks(res)
                }
                break;
            case 'POST':
                if (req.url === '/book') {
                    await this.decodeBody(req).then((finalBook) => {
                        console.log("body outside:" + finalBook);
                        this.createBook(req, res, finalBook)
                    });

                }
                break;
            default:
                this.errorNotFound(res)
        }
    }
}

module.exports = BookstoreServerController;