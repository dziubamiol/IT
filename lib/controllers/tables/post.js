import DB from './../../db/index.js';
import * as HTTPStatus from 'http-status-codes';
import Field from '../../db/controllers/Field.js';

export function table(req, res) {
    try {
        const DB_PATH = process.env.DB_PATH;
        const { databaseName, name } = req.params;
        const { schema } = req.body;
    
        const fields = schema.map(s => new Field(s.name, s.type));

        const table = DB.selectDatabase(databaseName, DB_PATH).createTable(name, fields);

        res.status(HTTPStatus.CREATED).json(table);
    } catch (e) {
        console.error(e);
        res.status(HTTPStatus.NOT_MODIFIED).send(e.error);
    }
}

export function row(req, res) {
    try {
        const DB_PATH = process.env.DB_PATH;
        const { databaseName, name } = req.params;
        const { data } = req.body;

        const table = DB.selectDatabase(databaseName, DB_PATH).selectTable(name);
        const row = { ...table.insertRow(data) };

        delete row.table;
        delete row.fields;

        table.save();

        res.status(HTTPStatus.CREATED).json(row);
    } catch (e) {
        console.error(e);
        res.status(HTTPStatus.NOT_MODIFIED).send(e.error);
    }
}