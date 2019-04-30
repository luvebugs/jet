import {store} from './jet';

const mapCoverToModel = (dispatch: any) => async (params: any) => {
    const {cover, toCamelCase, toKebabCase} = params;

    const originAuto =  params.sequelize.auto;
    params.sequelize.auto = function (name: any, config: any) {
        return originAuto.call(params.sequelize, name, config, (model: any) => {
            model && Object.keys(model).forEach(key => {
                model[key].allowNull = true;
            });
            model.id = {
                type: params.dataTypes['BIGINT'],
                autoIncrement: true, // 主键
                primaryKey: true, // 自增字段
                unique: true
            };
            return model;
        });
    };

    const model = await dispatch(params);

    // const findOne =  model.findOne;
    // model.findOne = async function (params: any) {
    //     const include = params.include && params.include.map((item: any) => {
    //         return {
    //             ...item,
    //             association: item.association,
    //             where: toKebabCase(item.where)
    //         }
    //     });
    //     const where = toKebabCase(params.where);
    //     let options = params;
    //     if (include) {
    //         options.include = include;
    //     }
    //     if (where) {
    //         options.where = where;
    //     }
    //     const data = await findOne.call(this, options);
    //     return toCamelCase(data);
    // };

    // model.findOne = cover(model.findOne);
    // model.findByIdWithUser = cover(model.findByIdWithUser);
    return model;
}

const model = (...params: any[]) => (model: any) => {
    return store(
        mapCoverToModel,
        ...params
    )(model);
};

export default model;