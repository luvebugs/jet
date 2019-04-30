"use strict";
/**
 * @file util.js
 * @author sunxiaoxu01
 * @description util
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = (content, type = 'trace') => {
    // console.log(`Calling ${key} with`, type, arguments);
    try {
        // 获取当前调用堆栈信息
        const getPosition = () => {
            return new Error().stack.split('\n')
                .slice(3, 6).map(item => item.trim()).join();
        };
        let custom = {
            logPosition: getPosition()
        };
        if ('object' === typeof content) {
            custom = Object.assign({}, custom, content);
            global.yog.log[type]({
                custom
            });
        }
        else {
            global.yog.log[type]({
                msg: content,
                custom
            });
        }
    }
    catch (e) {
        global.yog.log.trace(`trace日志写入失败: ${JSON.stringify(content)}`);
    }
};
exports.getEnv = () => {
    return process.env.YOG_ENV || global.yog.conf.env;
};
exports.defineRequire = (name, isContinue = false, isCurrent = false) => {
    let definition;
    try {
        if (isCurrent) {
            definition = require(name);
        }
        else {
            definition = global.yog.require(name);
        }
    }
    catch (err) {
        if (isContinue) {
            definition = null;
        }
        else {
            throw (`无法加载模块: ${JSON.stringify(name)}`);
        }
    }
    return definition;
};
