"use strict";
/**
 * @file model.js
 * @author sunxiaoxu01
 * @description model demo
 */
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../lib/model");
exports.default = model_1.default()(({ sequelize, dataTypes }) => {
    const Right = sequelize.auto('right', 'hk_right', {
        timestamps: false
    });
    return Right;
});
