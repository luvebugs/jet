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
const util_1 = require("./util");
const convert_1 = require("./convert");
exports.database = (name, dirname) => (options) => {
    const databases = { 'sequelize': './sequelize', 'gp': './gp' };
    const database = util_1.load((dispatch) => ({ name }) => require(name))(databases[name] || name);
    return (database && database.default)(options);
};
exports.store = (...middlewares) => (target, options) => (sequelize, dataTypes) => {
    function cover(target) {
        const originTarget = target;
        return convert_1.convert(function (...params) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield originTarget.apply(this, params);
            });
        });
    }
    const dispatch = util_1.applyMiddleware(target, ...middlewares)();
    return dispatch({
        sequelize,
        dataTypes,
        cover,
        options
    });
};
exports.storeDecorator = (name, execute = 'init') => (target) => {
    const defindCall = (sequelize, dataTypes) => {
        return target[execute](sequelize, dataTypes, name);
    };
    return defindCall;
};
