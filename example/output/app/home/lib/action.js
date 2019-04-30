"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jet_1 = require("./jet");
const mapPropsToAction = (dispatch) => ({ req, res, next }) => __awaiter(this, void 0, void 0, function* () {
    function renderJson(data, errno, msg) {
        return res.api(data, errno, msg);
    }
    function renderTpl(tpl, data) {
        return res.renderTpl(tpl, data);
    }
    return dispatch({
        req,
        res,
        next,
        renderJson,
        renderTpl
    });
});
exports.default = (...params) => (action) => {
    return jet_1.route(mapPropsToAction, ...params)(action);
};
