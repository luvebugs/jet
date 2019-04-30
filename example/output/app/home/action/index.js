"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const action_1 = require("../lib/action");
const service_1 = require("../service");
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
exports.default = action_1.default()(({ req, res, renderJson, renderTpl }) => __awaiter(this, void 0, void 0, function* () {
    if (!req.session.count) {
        req.session.count = 1;
    }
    req.session.count += 1;
    // console.log(util, util.name, util.default);
    const data = yield service_1.getTest();
    data.count = req.session.count;
    return data;
}));
