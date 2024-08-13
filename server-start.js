const connectToDatabase =require('./database-connection');
const express=require('express');
const booksRouter=require('./routers/book.router');
const usersRouter=require('./routers/user.router');
const ordersRouter=require('./routers/order.router');
require('dotenv').config();

app=express();
connectToDatabase();
app.use(express.json());
app.use("/books",booksRouter)
app.use("/users",usersRouter)
app.use("/orders",ordersRouter)
app.listen(process.env.PORT,process.env.IP, () => {
    console.log(`Server is running on http://${process.env.IP}:${process.env.PORT}`);

});

