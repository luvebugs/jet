import {use, init} from './lib/jet';
import * as graphqlHTTP from 'express-graphql';
import {buildSchema, GraphQLSchema, GraphQLObjectType, GraphQLString} from 'graphql';
import * as axios from 'axios';
import './action/index';
// import './model/index';

// const schema = buildSchema(`
//     type Query {
//         user: String
//     }
// `);

// const someFunctionToGetRootValue = (request : any) => {
//     return axios.post(baseurl + '/index')
//         .then(function (response: any) {
//             return response.data;
//         })
//         .catch(function (error: any) {
//             console.log(error);
//         });
// }

export default function (router: any) {

    const baseurl = 'http://localhost:8085'

    // 定义 User 类型
    const userType = new GraphQLObjectType({
        name: 'User',
        fields: {
            id: {type: GraphQLString},
            userName: {type: GraphQLString},
            companyName: {type: GraphQLString},
            companyShortName: {type: GraphQLString},
            bank: {type: GraphQLString}
        }
    });
      
    // 定义 Query 类型
    const queryType = new GraphQLObjectType({
        name: 'Query',
        fields: {
            user: {
                type: userType,
                // `args` 描述了 `user` 查询接受的参数
                args: {
                    id: { type: GraphQLString }
                },
                resolve: function (_: any, {id}: any) {
                    const user = axios.get(baseurl + '/api/index')
                        .then(function (response: any) {
                            return response.data;
                        })
                        .catch(function (error: any) {
                            console.log(error);
                        });
                    return user;
                }
            }
        }
    });
      
    const schema = new GraphQLSchema({query: queryType});
    router.all('*', (req: any, res: any, next: any) => {
        console.log(req.params);
        next();
    });
    // router.use('/graphql', graphqlHTTP(async (request: any, response: any, graphQLParams: any) => ({
    //     schema: schema,
    //     graphiql: true,
    // })));
    const getUserInfo = (req:any, res:any, next:any) => {
        console.log('1', req.params);
        let userId = req.cookies.userId;
        if (!userId) {
            userId = Math.round(Date.now() + Math.random() * 100);
            res.cookie('userId', userId);
        }
        req.userId = userId;
        next();
    };
    router.use(getUserInfo);
    init(router);


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
};
