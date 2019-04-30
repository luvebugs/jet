"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jet_1 = require("./lib/jet");
// import './action/index';
// import './model/index';
function default_1(router) {
    const getUserInfo = (req, res, next) => {
        let userId = req.cookies.userId;
        if (!userId) {
            userId = Math.round(Date.now() + Math.random() * 100);
            res.cookie('userId', userId);
        }
        req.userId = userId;
        next();
    };
    jet_1.use(getUserInfo);
    jet_1.init(router);
    // router.route('/book')
    //     // PUT /home/book
    //     .put(router.action('book').put)
    //     // GET /home/book
    //     .get(router.action('book'));
    // router.route('/book/:id')
    //     // GET /home/book/1
    //     .get(router.action('book').get)
    //     // DELETE /home/book/1
    //     .delete(router.action('book').del);
    // router.use(function (req:any, res:any, next:any) {
    //     /^\/api\//.test(req.path) ? next() : router.action('index')(req, res, next)
    // });
}
exports.default = default_1;
;
