"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const route_1 = require("./route");
exports.routeDecorator = route_1.routeDecorator;
exports.route = route_1.route;
exports.use = route_1.use;
const store_1 = require("./store");
exports.storeDecorator = store_1.storeDecorator;
exports.store = store_1.store;
exports.schema = store_1.schema;
exports.cover = store_1.cover;
const util_1 = require("./util");
exports.toCamelJSON = util_1.toCamelJSON;
exports.toKebabJSON = util_1.toKebabJSON;
exports.toCamelCase = util_1.toCamelCase;
exports.toKebabCase = util_1.toKebabCase;
exports.toJSONString = util_1.toJSONString;
exports.toJSONParse = util_1.toJSONParse;
exports.load = util_1.load;
exports.read = util_1.read;
function init(router) {
    router.use((req, res, next) => {
        console.log(req.params.action);
        res.api = function (data) {
            res.json(data);
        };
        res.renderTpl = function (tpl, data) {
            res.render(tpl, data);
        };
        res.exportFile = function (path) {
            res.sendfile(path);
        };
        next();
    });
    route_1.use(router);
    return router;
}
exports.init = init;
//# sourceMappingURL=index.js.map