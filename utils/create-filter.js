const {validateQuery} = require("./query-validator");

function createFilter(req, type,menu) {
    const filters = {};
    let sortOrder = "asc";
    let sortBy = "name";
    let limit = 10;
    let page = 1;
    for (let key in req.query) {
        if (req.query.hasOwnProperty(key)) {
            if (!validateQuery(key, req.query[key], type))
                return {filters, sortBy, sortOrder, limit, ok: false};
            if (key === "sortBy") {
                sortBy = req.query[key];
                continue;
            }
            if (key === "minPrice" || key === "maxPrice") {
                filters["price"] = {$gte: parseInt(req.query["minPrice"]), $lte: parseInt(req.query["maxPrice"])};
                continue;
            }
            if (key === "minYear" || key === "maxYear") {
                filters["year"] = {$gte: parseInt(req.query["minYear"]), $lte: parseInt(req.query["maxYear"])};
                continue;
            }
            if (key === "sortOrder") {
                sortOrder = req.query[key];
                continue;
            }
            if (key === "limit") {
                limit = parseInt(req.query[key]);
                continue;
            }
            if (key === "page") {
                page = parseInt(req.query[key]);
                continue;
            }
            if (key === "name") {
                filters[key] = {"$regex": req.query[key], "$options": "i"};
                continue;
            }
            if (key === "quantity") {
                filters[key] = {$gte: req.query[key]};
                continue;
            }
            if(menu)
            {
                if(key==="genre")
                {
                    filters[key] = {$in: req.query[key]};
                    continue;
                }
                if(key==="author"){
                    filters[key] = {$in: req.query[key]};
                    continue;
                }
            }
            filters[key] = req.query[key];


        }
    }
    console.log(filters, limit, page);
    return {filters, sortBy, sortOrder, limit, page, ok: true};
}

module.exports = {createFilter};