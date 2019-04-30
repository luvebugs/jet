import {schema} from './jet';

declare const process: any;

export default (dirname?: string, filename?: string) => (config: any = {}) => {
    const dbConfig: any = {
        development: {
            username: 'root',
            password: '123456',
            database: 'fpd_icash_hk',
            host: '10.95.185.28',
            port: 8881,
            dialect: 'mysql',
            directory: false, // prevents the program from writing to disk
            additional: {
                timestamps: false
            }
        }
    };

    let env: string = 'development';
    switch (process.env.YOG_ENV) {
        case 'rd':
        case 'debug':
            env = 'development';
            break;
        case 'qa':
        case 'test':
            env = 'test';
            break;
        default:
            env = 'product';
            break;
    };
    const dbOptions = {
        ...dbConfig[env],
        ...config,
        dirname,
        filename
    };
    return schema('sequelize')(dbOptions);
};