const {validateQuery} = require("./query-validator");
function createFilter(req,type,strict) {
    const filters = {};
    let sortOrder="asc";
    let sortBy="name";
    let limit=10;
    let page=1;
    for (let key in req.query) {
        if (req.query.hasOwnProperty(key)) {
            if(!validateQuery(key,req.query[key],type))
                return {filters,sortBy,sortOrder,limit,ok:false};
            if(req.query[key].includes("-"))
            {
                let vals=req.query[key].split("-");
                filters[key] = {$gte: vals[0], $lte: vals[1]};
                continue;
            }
            if(key==="sortBy")
            {
                sortBy=req.query[key];
                continue;
            }
            if(key==="sortOrder")
            {
                sortOrder=req.query[key];
                continue;
            }
            if(key==="limit")
            {
                limit=parseInt(req.query[key]);
                continue;
            }
            if(key==="page")
            {
                page=parseInt(req.query[key]);
                continue;
            }
            if(!strict)
                filters[key]={ "$regex": req.query[key], "$options": "i" };
            else
                filters[key]=req.query[key];


        }
    }
    console.log(filters);
    return {filters,sortBy,sortOrder,limit,page,ok:true};
}

module.exports = {createFilter};