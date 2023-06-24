class BaseController {
    constructor(name, cache = false, auth = false) {
        this.name = name;
        this.cache = cache;
        this.auth = auth;
    }

    json(res, result, status_code = 200) {
        res.locals.cache_data = this.cache && result && result.success ? result : null;
        return res.status(status_code).json(result);
    }

    send(res, content, type = 'text/plain', status_code = 200) {
        res.locals.cache_data = this.cache && content ? content : null;
        if (type) {
            res.type(type);
        }
        return res.status(status_code).send(content);
    }
}

module.exports = BaseController;
