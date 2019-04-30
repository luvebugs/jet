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
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const SequelizeAuto = require("sequelize-auto");
exports.default = (options) => {
    const { database, username, password, filename, dirname } = options;
    const basename = filename.split(',').map((file) => path.basename(file));
    let models = {};
    const sequelize = new Sequelize(database, username, password, options);
    function auto(modelName, tableName, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const auto = new SequelizeAuto(database, username, password, Object.assign({}, options, { tables: [tableName], directory: false }));
            yield new Promise((resolve, reject) => auto.run(function (err) {
                if (err)
                    throw err && reject(err);
                resolve(auto);
            }));
            return this.define(modelName, eval(auto.tables[tableName]), Object.assign({}, config, { tableName }));
        });
    }
    sequelize.auto = auto;
    fs.readdirSync(dirname).filter((file) => {
        return (file.indexOf('.') !== 0) && (!~basename.indexOf(file)) && (file.slice(-3) === '.js');
    }).map((file) => __awaiter(this, void 0, void 0, function* () {
        const model = sequelize['import'](path.join(dirname, file));
        const name = path.basename(file, '.js');
        models[model.name || name] = model;
    }));
    Object.keys(models).forEach(modelName => {
        if (models[modelName].associate) {
            models[modelName].associate(models);
        }
    });
    const db = Object.assign({}, models, { sequelize,
        Sequelize });
    return db;
};
