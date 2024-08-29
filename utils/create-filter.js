
function createFilter(query) {
    const filters = {};
    let sortOrder = "asc";
    let sortBy = "name";
    let limit = 10;
    let page = 1;
    for (let key in query) {
            if (key === "sortBy") {
                sortBy = query[key];
                continue;
            }
            if (key === "minPrice" || key === "maxPrice") {
                filters["price"] = {$gte: parseInt(query["minPrice"]), $lte: parseInt(query["maxPrice"])};
                continue;
            }
            if (key === "minYear" || key === "maxYear") {
                filters["year"] = {$gte: parseInt(query["minYear"]), $lte: parseInt(query["maxYear"])};
                continue;
            }
            if (key === "sortOrder") {
                sortOrder = query[key];
                continue;
            }
            if (key === "limit") {
                limit = parseInt(query[key]);
                continue;
            }
            if (key === "page") {
                page = parseInt(query[key]);
                continue;
            }
            if (key === "name") {
                filters[key] = {"$regex": query[key], "$options": "i"};
                continue;
            }
            if (key === "quantity") {
                filters[key] = {$gte: query[key]};
                continue;
            }
            if (key === "genre") {
                filters[key] = {$in: query[key]};
                continue;
            }
            if (key === "author") {
                filters[key] = {$in: query[key]};
                continue;
            }
            if (key === "_id") {
                filters[key] = query[key];
            }

        }
    return {filters, sortBy, sortOrder, limit, page, ok: true};
}

module.exports = {createFilter};