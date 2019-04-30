/**
 * @file index.js
 * @author sunxiaoxu01
 * @description 暴露接口
 */

import {routeDecorator, route, use} from './route';
import {storeDecorator, store, schema, cover} from './store';
import {toCamelJSON, toKebabJSON, toCamelCase, toKebabCase, toJSONString, toJSONParse, load, read} from './util';

function init(router: any) {
    router.use((req: any, res: any, next: any) => {
        console.log(req.params.action);
        res.api = function (data: any) {
            res.json(data);
        };
        res.renderTpl = function (tpl: any, data?: any) {
            res.render(tpl, data);
        };
        res.exportFile = function (path: any) {
            res.sendfile(path);
        };
        next();
    });
    use(router);
    return router;
}

export {
    use,
    route,
    routeDecorator,
    cover,
    schema,
    store,
    storeDecorator,
    toCamelJSON,
    toKebabJSON,
    toCamelCase,
    toKebabCase,
    toJSONString,
    toJSONParse,
    load,
    read,
    init
}