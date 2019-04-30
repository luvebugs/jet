"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
exports.default = (options) => {
    const schema = graphql_1.buildSchema(options.schema);
    const root = options.root;
    return (query) => graphql_1.graphql(schema, query, root);
};
//# sourceMappingURL=graphql.js.map