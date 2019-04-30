"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schedule = require("node-schedule");
const schedules = [];
let jobs = [];
exports.subscribeDecorator = (rule) => (target, key, descriptor) => {
    schedules.push({
        rule,
        subscribe: descriptor.value
    });
    return descriptor;
};
exports.subscribe = (rule) => (target) => {
    schedules.push({
        rule,
        subscribe: target
    });
};
exports.initSchedule = (options) => {
    console.log(schedules);
    jobs = schedules.map(({ rule, subscribe }) => schedule.scheduleJob(rule, subscribe));
    return jobs;
};
exports.resetSchedule = () => {
    return jobs;
};
//# sourceMappingURL=schedule.js.map