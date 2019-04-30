"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let middlewares = [[
        (req, res, next) => {
            res.ended = 0;
            res.api = function (data) {
                !res.ended && res.json(data);
                res.ended = 1;
            };
            res.renderTpl = function (tpl, data) {
                !res.ended && res.render(tpl, data);
                res.ended = 1;
            };
            res.exportFile = function (path) {
                !res.ended && res.sendfile(path);
                res.ended = 1;
            };
            next();
        }
    ]];
exports.initMiddleware = (router) => {
    middlewares.forEach((middleware) => {
        router.use(...middleware);
    });
};
exports.use = (...middleware) => {
    middlewares.push(middleware);
};
//# sourceMappingURL=middleware.js.map