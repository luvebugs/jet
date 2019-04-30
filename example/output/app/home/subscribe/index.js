"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ subscribe, cancel }) => {
    const job = subscribe('*/2 * * * * *', function (fireDate) {
        // console.log('This job was supposed to run at ' + fireDate + ', but actually ran at ' + new Date());
    });
    return job;
};
