/**
 * @file model.js
 * @author sunxiaoxu01
 * @description model demo
 */

declare const __dirname: any;
declare const __filename: any;

// import BaseModel from '../common/model';

// export default class IndexModel extends BaseModel{
//     public constructor () {
//         super(__dirname, __filename);
//     }
// }

import database from '../lib/database';

let models = database(__dirname, `${__filename},right.js`)();

// Object.keys(models).map(async (key: any) => {
//     models[key] = await models[key];
// });

export default models;