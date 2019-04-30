/**
 * @file model.js
 * @author sunxiaoxu01
 * @description model demo
 */

import model from '../lib/model';

export default model()(({sequelize, dataTypes}: any) => {
    const Right = sequelize.auto('right', {
            timestamps: false,
            tableName: 'hk_right'
    });
    return Right;
});