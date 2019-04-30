"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const route_1 = require("./route");
exports.routeDecorator = route_1.routeDecorator;
exports.route = route_1.route;
const store_1 = require("./store");
exports.storeDecorator = store_1.storeDecorator;
exports.store = store_1.store;
exports.database = store_1.database;
const middleware_1 = require("./middleware");
exports.use = middleware_1.use;
const convert_1 = require("./convert");
exports.convertDecorator = convert_1.convertDecorator;
const util_1 = require("./util");
exports.toCamelCaseJSON = util_1.toCamelCaseJSON;
exports.toKebabCaseJSON = util_1.toKebabCaseJSON;
exports.load = util_1.load;
function init(router) {
    middleware_1.initMiddleware(router);
    route_1.initRouter(router);
    return router;
}
exports.init = init;
