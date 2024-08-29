function validateQuery(key, value, type) {
    if(type === "user") {
        switch (key) {
            case "email":
                const regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
                if (!regex.test(value))
                    return false;
                break;
            case "isAdmin":
                if (!(value==="true" || value==="false"))
                    return false;
                break;
            default:
                return true;

        }
    }
    return true;

}

module.exports.validateQuery = validateQuery;