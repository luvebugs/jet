/**
 * @file service.js
 * @author sunxiaoxu01
 * @description service demo
 */

import {toJSONString} from '../lib/jet';
import data from '../model';
const {test} = data;

// export default class IndexService {
//     public async getTest() {
//         return await (await user).findOne({
//             where: {id: 1, userId: 17911025}
//         });
//     }
// }

export const getTest = async() => {

    (await test).create({
        name: '123123'
    });
    return '123123'
    // console.log(data);
    return await (await test).findOne({
        where: {id: 1}
    });
}