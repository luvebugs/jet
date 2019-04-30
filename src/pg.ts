/**
 * @file pg.js
 * @author sunxiaoxu01
 * @description sequelize
 */

import {Pool} from 'pg';

export default (options: any) => {
    const pool = new Pool(options);
    return pool;
}