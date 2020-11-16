import DB from './../../db/index.js';
import * as HTTPStatus from 'http-status-codes';

export function database(req, res) {
    try {
        const DB_PATH = process.env.DB_PATH;
        const { name } = req.params;

        const database = DB.createDatabase(name, DB_PATH);

        res.status(HTTPStatus.CREATED).json(database);
    } catch (e) {
        console.error(e);
        res.status(HTTPStatus.NOT_MODIFIED).send(e.error);
    }
}