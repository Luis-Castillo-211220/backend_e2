import { dataEnv } from './envData.js';


export const db = {
    user: dataEnv.parsed.USERS,
    host: dataEnv.parsed.HOST,
    database: dataEnv.parsed.DATABASE,
    password: dataEnv.parsed.PASSWORD,
};

export const api = {
    port: dataEnv.parsed.PORT,
};







