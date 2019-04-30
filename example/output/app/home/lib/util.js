"use strict";
/**
 * @file util.js
 * @author sunxiaoxu01
 * @description util
 */
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const jet_1 = require("./jet");
exports.name = new Promise((resolve, reject) => {
    resolve('lily');
});
// const fakeRequire = (dispatch: any) => async (name: any) => {
//     const module = await import(name);
//     return module;
// };
const fakeRequire = (dispatch) => ({ name }) => {
    const module = require(name);
    return dispatch(module);
};
exports.lazyload = (name, dirname) => {
    return jet_1.load(fakeRequire)(dirname ? path.join(dirname, name) : name);
};
exports.default = {
    hello: new Promise((resolve, reject) => {
        resolve('jack');
    })
};
