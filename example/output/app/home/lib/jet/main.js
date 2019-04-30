"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const routers = new Map();
exports.store = (target, options) => (sequelize, dataTypes) => {
    return target({
        sequelize,
        dataTypes,
        options
    });
};
exports.storeDecorator = (name, execute = 'init') => (target) => {
    const defindCall = (sequelize, dataTypes) => {
        return target[execute](sequelize, dataTypes, name);
    };
    return defindCall;
};
exports.route = (...middlewares) => (target, options) => (req, res, next) => {
    const chain = middlewares.map(middleware => middleware(req, res, next));
    function compose(...funcs) {
        return function (args) {
            return funcs.reduceRight(function (composed, f) {
                return f(composed);
            }, args);
        };
    }
    const dispatch = compose(...chain)(target);
    const params = Object.assign({}, req.body, req.query);
    return dispatch({
        req,
        res,
        next,
        params
    });
};
exports.routeDecorator = (url, method = 'get', execute = 'execute') => (target, key, descriptor) => {
    const middleware = (target, key, descriptor) => (req, res, next) => {
        let params = {};
        if (target.method === 'get') {
            params = req.query;
        }
        else {
            params = Object.assign({}, req.body, req.query);
        }
        if (typeof target === 'object') {
            return (new target.constructor({ req, res, next }))[key](params);
        }
        else {
            return new target({ req, res, next })[execute](params);
        }
    };
    const value = middleware(target, key, descriptor);
    routers.set(url, {
        value,
        method
    });
    return value;
};
exports.initRouter = (router) => {
    for (let key of routers.keys()) {
        const target = routers.get(key);
        router[target.method](key, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            req.method = target.method;
            const result = yield target.value(req, res, next);
            result && !res.status && res.json(result);
        }));
    }
};
