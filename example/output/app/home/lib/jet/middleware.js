"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let middlewares = [
    (req, res, next) => {
        res.status = 0;
        res.api = function (data) {
            !res.status && res.json(data);
            res.status = 1;
        };
        res.renderTpl = function (tpl, data) {
            !res.status && res.render(tpl, data);
            res.status = 1;
        };
        res.exportFile = function (path) {
            !res.status && res.sendfile(path);
            res.status = 1;
        };
        next();
    }
];
exports.initMiddleware = (router) => {
    middlewares.forEach((middleware) => {
        router.use(middleware);
    });
};
exports.use = (middleware) => {
    middlewares.push(middleware);
};
