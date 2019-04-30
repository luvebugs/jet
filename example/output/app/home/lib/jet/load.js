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
const path = require("path");
const stores = new Map();
stores.set('sequelize', './sequelize');
stores.set('gp', './pg');
exports.load = (filename, { dirname, async }) => {
    return new Proxy({}, {
        set(target, prop, value) {
            target[prop] = value;
        },
        get(target, prop) {
            if (prop in target) {
                return target[prop];
            }
            else {
                const pathname = path.join(dirname, filename);
                const model = async ? Promise.resolve().then(() => require(pathname)) : require(pathname);
                return model[prop];
            }
        },
    });
};
exports.loadDB = (name) => (options) => __awaiter(this, void 0, void 0, function* () {
    const database = yield Promise.resolve().then(() => require(stores.get(name)));
    return database.default(options);
});
