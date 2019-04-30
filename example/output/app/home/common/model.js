"use strict";
/**
 * @file model.js
 * @author sunxiaoxu01
 * @description model base
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jet_1 = require("../lib/jet");
class BaseModel {
    constructor(dirname, filename) {
        this.dbConfig = {
            development: {
                username: 'root',
                password: '123456',
                database: 'fpd_icash_hk',
                host: '10.95.185.28',
                port: 8881,
                dialect: 'mysql'
            }
        };
        this.gpConfig = {
            development: {
                database: 'fso_mall',
                host: '10.109.30.22',
                user: 'fsg_rcc_smartaquire_targetselect_rd',
                password: 'soelsiNIOJL43224KLNJ'
            }
        };
        this.filename = filename;
        this.dirname = dirname;
    }
    getDB() {
        return __awaiter(this, void 0, void 0, function* () {
            let env = 'development';
            switch (process.env.YOG_ENV) {
                case 'rd':
                case 'debug':
                    env = 'development';
                    break;
                case 'qa':
                case 'test':
                    env = 'test';
                    break;
                default:
                    env = 'product';
                    break;
            }
            ;
            const dbOptions = Object.assign({}, this.dbConfig[env], { dirname: this.dirname, filename: this.filename, ignorename: [] });
            console.log(dbOptions);
            return yield jet_1.database('sequelize')(dbOptions);
        });
    }
    getGP() {
        return __awaiter(this, void 0, void 0, function* () {
            let env = 'development';
            switch (process.env.YOG_ENV) {
                case 'rd':
                case 'dev':
                    env = 'development';
                    break;
                case 'qa':
                case 'test':
                    env = 'test';
                    break;
                default:
                    env = 'product';
                    break;
            }
            ;
            const gpOptions = Object.assign({}, this.gpConfig[env]);
            return yield jet_1.database('gp')(gpOptions);
        });
    }
}
exports.default = BaseModel;
