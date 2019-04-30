/**
 * @file util.js
 * @author sunxiaoxu01
 * @description util
 */

import * as path from 'path';
import {load} from './jet';

export const name = new Promise((resolve, reject) => {
    resolve('lily');
});

declare const require: any;


// const fakeRequire = (dispatch: any) => async (name: any) => {
//     const module = await import(name);
//     return module;
// };

const fakeRequire = (dispatch: any) => ({name}: any) => {
    const module = require(name);
    return dispatch(module);
};

export const lazyload = (name: any, dirname: any) => {
    return load(fakeRequire)(dirname ? path.join(dirname, name) : name);
};

export default {
    hello: new Promise((resolve, reject) => {
        resolve('jack');
    })
};