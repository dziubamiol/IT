import DB from './../../db/index.js';
import * as HTTPStatus from 'http-status-codes';


export function database(req, res) {
    try {
        const DB_PATH = process.env.DB_PATH;
        DB.selectDatabase(req.params.database, DB_PATH).dropDatabase();

        res.status(HTTPStatus.OK).json();
    } catch(e) {
        console.error(e);
        res.status(HTTPStatus.NOT_FOUND).send(e.message);
    }
}