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
const util_1 = require("./util");
exports.schema = (name, dirname) => (options) => {
    const schemas = { 'sequelize': './sequelize', 'pg': './pg' };
    const schema = util_1.load(() => ({ name }) => require(name))(schemas[name] || name);
    return (schema && schema.default)(options);
};
exports.cover = function (target) {
    return function (...params) {
        return __awaiter(this, void 0, void 0, function* () {
            params = params.map(item => {
                return util_1.toKebabCase(item);
            });
            const value = yield target.apply(this, params);
            return util_1.toCamelCase(value);
        });
    };
};
exports.store = (...middlewares) => (target, options) => (sequelize, dataTypes) => {
    const dispatch = util_1.applyMiddleware(target, ...middlewares)();
    return dispatch({
        sequelize,
        dataTypes,
        toKebabCase: util_1.toKebabCase,
        toCamelCase: util_1.toCamelCase,
        toCamel: util_1.toCamel,
        toKebab: util_1.toKebab,
        toKebabJSON: util_1.toKebabJSON,
        toCamelJSON: util_1.toCamelJSON,
        cover: exports.cover,
        options
    });
};
exports.storeDecorator = (name, execute = 'init') => (target) => {
    const defindCall = (sequelize, dataTypes) => {
        return target[execute](sequelize, dataTypes, name);
    };
    return defindCall;
};
//# sourceMappingURL=store.js.map