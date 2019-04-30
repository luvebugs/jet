/**
 * @file action.js
 * @author sunxiaoxu01
 * @description action demo
 */
// import {routeDecorator} from '../lib/jet';
// import BaseAction from '../common/action';
// import Service from '../service';

import action from '../lib/action';
import {getTest} from '../service';

declare const __dirname: any;
declare const require: any;

// import {lazyload} from '../lib/util';


// const {hello} = lazyload('../lib/util', __dirname);
// console.log(hello);

// @routeDecorator('/api', 'get')
// export default class IndexAction extends BaseAction{
//     private service: any;

//     @routeDecorator('/api/a', 'get')
//     public async getData(params: any) {
//         this.service = new Service();
//         const data = await this.service.getTest();
//         // this.renderJson(data);
//         return 123123123;
//     }

//     /**
//      * ODP必须实现的excute方法，统一入口
//      * execute
//      */
//     public async execute(params: any) {
//         this.service = new Service();
//         const userId = params.userId;
//         const data = await this.service.getTest(userId);
//         // this.renderTpl('home/page/index.tpl', {
//         //     msg: '12312323'
//         // });
//         return 123123123;
//     }
// }

action()(async ({req}: any) => {
    if (!req.session.count) {
        req.session.count = 1;
    }
    req.session.count += 1;
    const data = await getTest();
    data.count = {count: req.session.count};
    return data;
}, '/api/index', 'get');

const mapGraphqlHTTP = (dispatch: any) => async (params: any) => {
    const schema = `
        type Query {
            userName: String
        }
    `;
    const graphql = params.graphql;
    const root = await dispatch(params);
    return graphql({schema, root})('{ userName }');
}

export default action(
    // mapGraphqlHTTP
)(async ({req, res, renderJson, renderTpl}: any) => {
    // console.log(util, util.name, util.default);
    const data = await getTest();
    return data;
});
