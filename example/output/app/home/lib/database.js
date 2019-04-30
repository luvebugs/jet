"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jet_1 = require("./jet");
exports.default = (dirname, filename) => (config = {}) => {
    const dbConfig = {
        development: {
            username: 'root',
            password: '123456',
            database: 'fpd_icash_hk',
            host: '10.95.185.28',
            port: 8881,
            dialect: 'mysql',
            directory: false,
            additional: {
                timestamps: false
            }
        }
    };
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
    const dbOptions = Object.assign({}, dbConfig[env], config, { dirname,
        filename });
    return jet_1.database('sequelize')(dbOptions);
};
