"use strict";
/**
 * @file model.js
 * @author sunxiaoxu01
 * @description model demo
 */
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../lib/model");
// import Sequelize from 'sequelize';
// @storeDecorator('user')
// export default class UserModel extends Sequelize.Model {
//     static init(sequelize: any, dataTypes: any, name: any) {
//         const {STRING} = dataTypes;
//         return super.init(
//             {
//                 user_name: STRING(30),
//                 user_id: STRING(30),
//             }, {
//                 modelName: name,
//                 timestamps: false,
//                 tableName: 'hk_user',
//                 sequelize
//             }
//         );
//     }
//     @convertDecorator('toCamelCase')
//     static findByIdWithUser(where: any) {
//         return  this.findOne({
//             where
//         });
//     }
// }
const user = model_1.default()(({ sequelize, dataTypes }) => {
    // const {STRING} = dataTypes;
    // const User = sequelize.define('user', {
    //     id: {
    //         type: STRING(30),
    //         autoIncrement: true, // 主键
    //         primaryKey: true, // 自增字段
    //         unique: true
    //     },
    //     user_name: STRING(30),
    //     user_id: STRING(30),
    // }, {
    //     timestamps: false,
    //     tableName: 'hk_user'
    // });
    // User.findByIdWithUser = async function({where}: any) {
    //     return await this.findOne({
    //         where
    //     });
    // };
    const User = sequelize.auto('user', 'hk_user', {
        timestamps: false
    });
    return User;
});
exports.default = user;
