/**
 * @file sequelize.js
 * @author sunxiaoxu01
 * @description sequelize
 */

import * as fs from 'fs';
import * as path from 'path';
import * as Sequelize from 'sequelize';
import * as SequelizeAuto from 'sequelize-auto';
import {read} from './util';

export default (options: any) => {
    const {database, username, password, filename, dirname} = options;
    // const basename  = filename.split(',').map((file: any) => path.basename(file));
    // let models: any = {};
    const sequelize = new Sequelize(database, username, password, options);

    async function auto(modelName: string, {tableName, ...rest}: any, callback?: any) {
        const auto = new SequelizeAuto(database, username, password, {
            tables: [tableName],
            ...options,
            directory: false // prevents the program from writing to disk
        });
        await new Promise((resolve: any, reject: any) => auto.run(function (err: any) {
            if (err) throw err && reject(err);
            resolve(auto);
        }));
        const schame = auto.tables[tableName];
        const model = callback ? callback(schame) : schame;
        return this.define(modelName, model, {
            ...rest,
            tableName
        });
    }

    sequelize.auto = auto;

    // fs.readdirSync(dirname).filter((file: any) => {
    //     return (file.indexOf('.') !== 0) && (!~basename.indexOf(file)) && (file.slice(-3) === '.js');
    // }).map(async (file: any) => {
    //     const model: any = sequelize['import'](path.join(dirname, file));
    //     const name = path.basename(file, '.js');
    //     models[model.name || name] = model;
    // });

    const models = read(dirname, filename, (name: any) => {
        return sequelize['import'](name);
    });
    
    Object.keys(models).forEach(modelName => {
        if (models[modelName].associate) {
            models[modelName].associate(models);
        }
    });
    
    const db = {
        ...models,
        sequelize,
        Sequelize
    };
    return db;
}