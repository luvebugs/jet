/**
 * @file pg.js
 * @author sunxiaoxu01
 * @description sequelize
 */

import {buildSchema, graphql} from 'graphql';

export default (options: any) => {
    const schema = buildSchema(options.schema);
    const root = options.root;
    return (query: any) => graphql(schema, query, root);
}