"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnv = () => {
    return process.env.YOG_ENV;
};
const propRE = /[\{|,][\s|"]*([a-zA-Z|_])+[\s|"]*(?=:)/g;
const camelCaseRE = /_([a-z])/g;
const kebabCaseRE = /([^_])([A-Z])/g;
exports.toCamelCase = (str) => str ? str.replace(camelCaseRE, function ($0, $1) {
    return $1.toUpperCase();
}) : str;
exports.toKebabCase = (str) => str ? str.replace(kebabCaseRE, '$1_$2').toLowerCase() : str;
exports.toCamelCaseJSON = (json) => json.replace(propRE, function ($0) {
    return exports.toCamelCase($0);
});
exports.toKebabCaseJSON = (json) => json.replace(propRE, function ($0, $1) {
    return exports.toKebabCase($0);
});
exports.applyMiddleware = (dispatch, ...middlewares) => (params) => {
    const chain = middlewares.map(middleware => params ? middleware(params) : middleware);
    function compose(...funcs) {
        return function (args) {
            return funcs.reduceRight(function (composed, f) {
                return f(composed);
            }, args);
        };
    }
    return compose(...chain)(dispatch);
};
exports.load = (...middlewares) => (name, options) => {
    const dispatch = exports.applyMiddleware((params) => params, ...middlewares)();
    const target = {};
    const handler = {
        get(target, prop) {
            const module = dispatch({ name });
            return Reflect.get(module, prop) || module.then && module.then((module) => Reflect.get(module, prop));
        },
        apply: (target, thisArg, args) => {
            const module = dispatch({ name });
            return Reflect.apply(module, thisArg, args);
        },
        construct: (target, args) => {
            const module = dispatch({ name });
            return Reflect.construct(module, args);
        }
    };
    return new Proxy(target, handler);
};
