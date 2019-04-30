"use strict";
/**
 * @file action.js
 * @author sunxiaoxu01
 * @description action demo
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
class BaseAction {
    constructor({ req, res, next }) {
        this.req = req;
        this.res = res;
        this.next = next;
    }
    /**
     * render result with json
     * renderJson
     * @param array $data
     */
    renderJson(data, errno, msg) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.res.api(data, errno, msg);
        });
    }
    /**
     * render result with tpl
     * renderTpl
     * @param array $data
     */
    renderTpl(tpl, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.res.renderTpl(tpl, data);
        });
    }
    /**
     * send file
     * sendFile
     * @param array $data
     */
    sendFile(path, filename) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.res.sendFileAndAttachment(path, filename);
        });
    }
    /**
     * execute
     * execute
     * @param array $data
     */
    execute(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    checkUc() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.req.ucClient) {
                const data = yield this.req.ucClient.validate();
                if (!data.jumped) {
                    return true;
                }
            }
            return false;
        });
    }
    getUcInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.req.ucClient.validate();
            return data;
        });
    }
    log(data) {
        console.log(`log`, data);
    }
    getParam() {
        return __awaiter(this, void 0, void 0, function* () {
            let params = {};
            if (this.req.method === 'get') {
                params = this.req.query;
            }
            else {
                params = this.req.body || this.req.query;
            }
            return params;
        });
    }
    setHeader(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            this.res.set(key, value);
        });
    }
}
exports.default = BaseAction;
