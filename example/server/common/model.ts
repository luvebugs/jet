/**
 * @file model.js
 * @author sunxiaoxu01
 * @description model base
 */

import {database} from '../lib/jet';

declare const process: any;

export default class BaseModel {
    private dbConfig: any = {
        development: {
            username: 'root',
            password: '123456',
            database: 'fpd_icash_hk',
            host: '10.95.185.28',
            port: 8881,
            dialect: 'mysql'
        }
    };
    private gpConfig: any = {
        development: {
            database: 'fso_mall',
            host: '10.109.30.22',
            user: 'fsg_rcc_smartaquire_targetselect_rd',
            password: 'soelsiNIOJL43224KLNJ'
        }
    };
    public dirname: any;
    public filename: any;
    public constructor (dirname: any, filename: any) {
        this.filename = filename;
        this.dirname = dirname;
    }
    public async getDB() {
        let env: string = 'development';
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
        };
        const dbOptions = {
            ...this.dbConfig[env],
            dirname: this.dirname,
            filename: this.filename,
            ignorename: []
        };
        console.log(dbOptions);
        return await database('sequelize')(dbOptions);
    }
    public async getGP() {
        let env: string = 'development';
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
        };
        const gpOptions = {
            ...this.gpConfig[env]
        };
        return await database('gp')(gpOptions);
    }
}