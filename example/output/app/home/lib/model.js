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
const mapCoverToModel = (dispatch) => (params) => __awaiter(this, void 0, void 0, function* () {
    const cover = params.cover;
    const model = yield dispatch(params);
    model.findOne = cover(model.findOne);
    model.findByIdWithUser = cover(model.findByIdWithUser);
    return model;
});
const model = (...params) => (model) => {
    return jet_1.store(mapCoverToModel, ...params)(model);
};
exports.default = model;
