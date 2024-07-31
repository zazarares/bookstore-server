function setupCORS(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'x-ijt, Content-Type, Authorization'); // Include x-ijt
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
}

module.exports = {setupCORS};