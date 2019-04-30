"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
exports.getEnv = () => {
    return process.env.YOG_ENV;
};
const propRE = /[\{|,][\s|"]*([a-zA-Z|_])+[\s|"]*(?=:)/g;
const camelCaseRE = /_([a-z])/g;
const kebabCaseRE = /([^_])([A-Z])/g;
exports.toCamel = (str) => str ? str.replace(camelCaseRE, function ($0, $1) {
    return $1.toUpperCase();
}) : str;
exports.toKebab = (str) => str ? str.replace(kebabCaseRE, '$1_$2').toLowerCase() : str;
exports.toCamelJSON = (json) => json.replace(propRE, function ($0) {
    return exports.toCamel($0);
});
exports.toKebabJSON = (json) => json.replace(propRE, function ($0, $1) {
    return exports.toKebab($0);
});
exports.toCamelCase = (obj) => {
    return exports.toJSONParse(exports.toCamelJSON(exports.toJSONString(obj)));
};
exports.toKebabCase = (obj) => {
    return exports.toJSONParse(exports.toKebabJSON(exports.toJSONString(obj)));
};
exports.toJSONString = (obj, cycle) => {
    cycle = cycle || new Map;
    const cache = [];
    return JSON.stringify(obj, function (key, value) {
        if (typeof value === 'object' && value !== null) {
            if (~cache.indexOf(value)) {
                return `[Circular ${key}]`;
            }
            cache.push(value);
            cycle.set(`[Circular ${key}]`, value);
        }
        return value;
    });
};
exports.toJSONParse = (str, cycle) => {
    cycle = cycle || new Map;
    return JSON.parse(str, function (key, value) {
        return cycle.get(value) || value;
    });
};
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
exports.read = (dirname, filename, callback) => {
    const basename = filename instanceof Array ? filename.map((file) => path.basename(file)) : filename;
    let modules = {};
    fs.readdirSync(dirname).filter((file) => {
        return (file.indexOf('.') !== 0) && (!~basename.indexOf(file)) && (file.slice(-3) === '.js');
    }).map((file) => __awaiter(this, void 0, void 0, function* () {
        const module = callback ? callback(path.join(dirname, file)) : exports.load(() => ({ name }) => require(name))(path.join(dirname, file));
        const name = path.basename(file, '.js');
        modules[module && module.name || name] = module;
    }));
    return modules;
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
//# sourceMappingURL=util.js.map