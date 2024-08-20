function urlToUser(req)
{
    return {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.isAdmin,
    }
}
function urlToBook(req)
{
    return {
        name: req.body.name,
        author: req.body.author,
        year: req.body.year,
        genre: req.body.genre,
        price: req.body.price,
        url: req.body.url,
        quantity: req.body.quantity
    }
}
module.exports= {urlToUser,urlToBook}