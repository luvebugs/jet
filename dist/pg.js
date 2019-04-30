"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
exports.default = (options) => {
    const pool = new pg_1.Pool(options);
    return pool;
};
//# sourceMappingURL=pg.js.map