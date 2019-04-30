"use strict";
/**
 * @file model.js
 * @author sunxiaoxu01
 * @description model demo
 */
Object.defineProperty(exports, "__esModule", { value: true });
// import BaseModel from '../common/model';
// export default class IndexModel extends BaseModel{
//     public constructor () {
//         super(__dirname, __filename);
//     }
// }
const database_1 = require("../lib/database");
let models = database_1.default(__dirname, `${__filename},right.js`)();
// Object.keys(models).map(async (key: any) => {
//     models[key] = await models[key];
// });
exports.default = models;
