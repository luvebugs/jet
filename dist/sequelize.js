"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const SequelizeAuto = require("sequelize-auto");
const util_1 = require("./util");
exports.default = (options) => {
    const { database, username, password, filename, dirname } = options;
    const sequelize = new Sequelize(database, username, password, options.options);
    function auto(modelName, _a, callback) {
        var { tableName } = _a, rest = __rest(_a, ["tableName"]);
        return __awaiter(this, void 0, void 0, function* () {
            const auto = new SequelizeAuto(database, username, password, Object.assign({ tables: [tableName] }, options, { directory: false }));
            yield new Promise((resolve, reject) => auto.run(function (err) {
                if (err)
                    throw err && reject(err);
                resolve(auto);
            }));
            const schame = auto.tables[tableName];
            const model = callback ? callback(schame) : schame;
            return this.define(modelName, model, Object.assign({}, rest, { tableName }));
        });
    }
    sequelize.auto = auto;
    const models = util_1.read(dirname, filename, (name) => {
        return sequelize['import'](name);
    });
    Object.keys(models).forEach(modelName => {
        if (models[modelName].associate) {
            models[modelName].associate(models);
        }
    });
    const db = Object.assign({}, models, { sequelize,
        Sequelize });
    return db;
};
//# sourceMappingURL=sequelize.js.map