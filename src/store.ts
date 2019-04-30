/**
 * @file store.js
 * @author sunxiaoxu01
 * @description store
 */
import {applyMiddleware, load, toCamelCase, toKebabCase, toCamel, toKebab, toKebabJSON, toCamelJSON} from './util';

declare const require: any;

export const schema = (name: string, dirname: any) => (options: any) => {
    const schemas = {'sequelize': './sequelize', 'pg': './pg'} as any;
    const schema = load(() => ({name}: any) => require(name))(schemas[name] || name);
    return (schema && schema.default)(options) as any;
};

export const cover = function (target: any) {
    return async function (...params: any[]) {
        params = params.map(item =>  {
            return toKebabCase(item);
        });
        const value = await target.apply(this, params);
        return toCamelCase(value);
    }
};

export const store = (...middlewares: any[]) => (target: any, options?: any) => (sequelize: any, dataTypes: any) => {
    const dispatch = applyMiddleware(target, ...middlewares)();
    return dispatch({
        sequelize,
        dataTypes,
        toKebabCase,
        toCamelCase,
        toCamel,
        toKebab,
        toKebabJSON,
        toCamelJSON,
        cover,
        options
    });
}

export const storeDecorator = (name: string, execute: string = 'init') => (target: any) => {
    const defindCall = (sequelize: any, dataTypes: any) => {
        return target[execute](sequelize, dataTypes, name);
    }
    return defindCall as any;
}
