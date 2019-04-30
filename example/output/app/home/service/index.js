"use strict";
/**
 * @file service.js
 * @author sunxiaoxu01
 * @description service demo
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../model");
const { user, right } = model_1.default;
// export default class IndexService {
//     public async getTest() {
//         return await (await user).findOne({
//             where: {id: 1, userId: 17911025}
//         });
//     }
// }
exports.getTest = () => __awaiter(this, void 0, void 0, function* () {
    const data = (yield right).findOne({
        where: { id: 1 }
    });
    console.log(data);
    return (yield user).findOne({
        where: { id: 1, userId: 17911025 }
    });
});
