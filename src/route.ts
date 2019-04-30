/**
 * @file jet.js
 * @author sunxiaoxu01
 * @description 基础类库
 */

import {applyMiddleware, load} from './util';

declare const require: any;

const routers: any = new Map();

export const route = (...middlewares: any[]) => (target: any, url?: any, method?: any) => {
    const middleware = (target: any) => async (req?: any, res?: any, next?: any) => {
        function graphql(options: any){
            const graphql = load(() => ({name}: any) => require(name))('./graphql');
            return (graphql && graphql.default)(options) as any;
        }
    
        const dispatch = applyMiddleware(target, ...middlewares)();
        const params = {...req.body, ...req.query};
        const result = await dispatch({
            req,
            res,
            next,
            graphql,
            params
        });
        return result && res.json(result);
    }

    const value = middleware(target);

    url && method && routers.set(url, {
        value,
        method
    });

    return value as any;
}

export const routeDecorator = (url: string, method: string = 'get', execute: string = 'execute') => (target: any, key?: string, descriptor?: any) => {
    const middleware = (target: any, key?: string, descriptor?: any) => async (req?: any, res?: any, next?: any) => {
        const params = {...req.body, ...req.query};
        let result = {};
        if (typeof target === 'object') {
            result = await (new target.constructor({req, res, next}))[key](params);
        } else {
            result = await new target({req, res, next})[execute](params);
            
        }
        return result && res.json(result);
    };
    const value = middleware(target, key, descriptor);
    routers.set(url, {
        value,
        method
    });
    return value as any;
}

export const use = (router: any) => {
    for (let key of routers.keys()) {
        const target = routers.get(key);
        router[target.method](key, (req: any, res: any, next: any)=> {
            req.method = target.method;
            return target.value(req, res, next);
        })
    }
}