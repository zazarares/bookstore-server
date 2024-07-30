const http = require('http');
const BookstoreServerController = require('./BookstoreServerController');
const connectToDatabase =require('./DBCommunicator');
const BookDBManager=require('./BookDBManager');
const {Db} = require("mongodb");
require('dotenv').config();
var bookList=[];
const mongoose = connectToDatabase();
const server = http.createServer((req, res) => {
    const controller = new BookstoreServerController();
    controller.createBookstoreServerController(req, res, bookList);
});

server.listen(parseInt(process.env.PORT), process.env.IP, () => {
    console.log(`Server running at http://${process.env.IP}:${process.env.PORT}/`);
});
