import DB from './../../db/index.js';
import * as HTTPStatus from 'http-status-codes';

export function databases(_, res) {
    try {
        const DB_PATH = process.env.DB_PATH;
        const databases = DB.listDatabasesNames(DB_PATH);

        res.status(HTTPStatus.OK).json(databases);
    } catch (e) {
        console.error(e);
        res.status(HTTPStatus.NOT_FOUND).send(e.message);
    }
}

export function database(req, res) {
    try {
        const DB_PATH = process.env.DB_PATH;
        const database = DB.selectDatabase(req.params.database, DB_PATH);

        res.status(HTTPStatus.OK).json(database);
    } catch(e) {
        console.error(e);
        res.status(HTTPStatus.NOT_FOUND).send(e.message);
    }
}