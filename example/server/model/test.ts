/**
 * @file model.js
 * @author sunxiaoxu01
 * @description model demo
 */

import model from '../lib/model';

const test = model()(({sequelize, dataTypes}: any) => {
    
    const Test = sequelize.auto('test', {
            timestamps: false,
            underscored: true,
            tableName: 'hk_test'
    });
    return Test;
});
export default test;