import {route} from './jet';

const mapPropsToAction = (dispatch: any) => async ({req, res, next, graphql, params}: any) => {

    function renderJson(data: any, errno?: any, msg?: any) {
        return res.api(data, errno, msg);
    }
    function renderTpl(tpl: any, data?: any) {
        return res.renderTpl(tpl, data);
    }
    return dispatch({
        req,
        res,
        next,
        renderJson,
        renderTpl,
        graphql,
        params
    });
}

export default (...params: any[]) => (action: any, url?: any, method?: any) => {
    return route(
        mapPropsToAction,
        ...params
    )(action, url, method);
};