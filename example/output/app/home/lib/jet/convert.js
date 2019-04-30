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
exports.convert = (target) => {
    return function (...params) {
        return __awaiter(this, void 0, void 0, function* () {
            params = params.map(item => JSON.parse(util_1.toKebabCaseJSON(JSON.stringify(item))));
            const value = yield target.apply(this, params);
            return JSON.parse(util_1.toCamelCaseJSON(JSON.stringify(value)));
        });
    };
};
exports.convertDecorator = (type) => (target, key, descriptor) => {
    const originValue = descriptor.value;
    descriptor.value = function (...params) {
        return __awaiter(this, void 0, void 0, function* () {
            params = params.map(item => JSON.parse(util_1.toKebabCaseJSON(JSON.stringify(item))));
            const value = yield originValue.apply(this, params);
            return JSON.parse(util_1.toCamelCaseJSON(JSON.stringify(value)));
        });
    };
    return descriptor;
};
