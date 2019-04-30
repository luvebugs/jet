/**
 * @file util.js
 * @author sunxiaoxu01
 * @description util
 */

declare const global: any;
declare const process: any;
declare const require: any;

export const log = (content: any, type: string = 'trace') => {
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
            custom = {...custom, ...content};
            global.yog.log[type]({
                custom
            });
        } else {
            global.yog.log[type]({
                msg: content,
                custom
            });
        }
    } catch (e) {
        global.yog.log.trace(`trace日志写入失败: ${JSON.stringify(content)}`);
    }
}


export const getEnv = () => {
    return process.env.YOG_ENV || global.yog.conf.env;
};


export const defineRequire = (name: string, isContinue = false, isCurrent = false) => {
    let definition;
    try {
        if (isCurrent) {
            definition = require(name);
        } else {
            definition = global.yog.require(name);
        }
    } catch (err) {
        if (isContinue) {
            definition = null;
        } else {
            throw (`无法加载模块: ${JSON.stringify(name)}`);
        }
    }
    return definition;
}