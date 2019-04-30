/**
 * @file util.js
 * @author sunxiaoxu01
 * @description util
*/

import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';

declare const require: any;
declare const process: any;

export const getEnv = () => {
    return process.env.YOG_ENV;
};

const propRE = /[\{|,][\s|"]*([a-zA-Z|_])+[\s|"]*(?=:)/g;
const camelCaseRE = /_([a-z])/g;
const kebabCaseRE = /([^_])([A-Z])/g;

export const toCamel = (str: any) => str ? str.replace(camelCaseRE, function ($0: any, $1: any) {
    return $1.toUpperCase();
}) : str;

export const toKebab = (str: any) => str ? str.replace(kebabCaseRE, '$1_$2').toLowerCase() : str;

export const toCamelJSON = (json: any) => json.replace(propRE, function ($0: any) {
    return toCamel($0);
});

export const toKebabJSON = (json: any) => json.replace(propRE, function ($0: any, $1: any) {
    return toKebab($0);
});

export const toCamelCase = (obj: any) => {
    return toJSONParse(toCamelJSON(toJSONString(obj)));
};

export const toKebabCase = (obj: any) => {
    return toJSONParse(toKebabJSON(toJSONString(obj)));
};

export const toJSONString = (obj: any, cycle?: any) => {
    cycle = cycle || new Map;
    const cache: any[] = [];
    return JSON.stringify(obj, function(key: any, value: any) {
        if (typeof value === 'object' && value !== null) {
            if (~cache.indexOf(value)) {
                // Circular reference found, discard key
                return `[Circular ${key}]`;
            }
            // Store value in our collection
            cache.push(value);
            cycle.set(`[Circular ${key}]`, value)
        }
        return value;
    });
};

export const toJSONParse = (str: any, cycle?: any) => {
    cycle = cycle || new Map;
    return JSON.parse(str, function(key: any, value: any) {
        return cycle.get(value) || value;
    });
};

// export const applyMiddleware = (dispatch: any, ...middlewares: any[]) => (...params: any[]) => {
//     const chain = middlewares.map(middleware => middleware(...params));
//     function compose(...funcs: any[]) {
//         return  function(args: any) {
//             return funcs.reduceRight(function(composed, f) {
//                 return f(composed);
//             }, args);
//         }
//     }
//     return compose(...chain)(dispatch);
// };

export const applyMiddleware = (dispatch?: any, ...middlewares: any[]) => (params?: any) => {
    const chain = middlewares.map(middleware => params ? middleware(params) : middleware);
    function compose(...funcs: any[]) {
        return  function(args: any) {
            return funcs.reduceRight(function(composed, f) {
                return f(composed);
            }, args);
        }
    }
    return compose(...chain)(dispatch);
};

export const read = (dirname: any, filename: any, callback?: any) => {
    const basename  = filename instanceof Array ? filename.map((file: any) => path.basename(file)) : filename;
    let modules: any = {};
    fs.readdirSync(dirname).filter((file: any) => {
        return (file.indexOf('.') !== 0) && (!~basename.indexOf(file)) && (file.slice(-3) === '.js');
    }).map(async (file: any) => {
        const module = callback ? callback(path.join(dirname, file)) : load(() => ({name}: any) => require(name))(path.join(dirname, file));
        const name = path.basename(file, '.js');
        modules[module && module.name || name] = module;
    });
    return modules;
}

export const load = (...middlewares: any[]) => (name: string, options?: any) => {
    const dispatch = applyMiddleware((params: any) => params, ...middlewares)();
    const target: any = {};
    const handler = {
        get(target: any, prop: any) {
            const module = dispatch({name});
            return Reflect.get(module, prop) || module.then && module.then((module: any) => Reflect.get(module, prop));
            // if (prop in target) {
            //     return target[prop]
            // } else {
            //     const pathname = dirname ? path.join(dirname, filename) : filename;
            //     return async ? import(pathname).then((module: any) => module[prop]) : require(pathname)[prop]
            // }
        },
        apply: (target: any, thisArg: any, args: any) => {
            const module = dispatch({name});
            return Reflect.apply(module, thisArg, args);
        },
        construct: (target: any, args: any) => {
            const module = dispatch({name});
            return  Reflect.construct(module, args);
        }
    };
    return new Proxy(target, handler as any)
}