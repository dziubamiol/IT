import DB from './../../db/index.js';
import * as HTTPStatus from 'http-status-codes';


export function table(req, res) {
    try {
        const DB_PATH = process.env.DB_PATH
        const { databaseName, name } = req.params;

        DB.selectDatabase(databaseName, DB_PATH).selectTable(name).dropTable();

        res.status(HTTPStatus.OK).send();
    } catch(e) {
        console.error(e);
        res.status(HTTPStatus.NOT_FOUND).send(e.message);
    }
}

export function rowByID(req, res) {
    try {
        const DB_PATH = process.env.DB_PATH
        const { databaseName, name, id } = req.params;

        const selectedTable = DB.selectDatabase(databaseName, DB_PATH).selectTable(name);
        

        const selectedRow = selectedTable.rows.filter(r => r.id === id)[0];

        if (!selectedRow) {
            res.status(HTTPStatus.NOT_FOUND).send(`Cannot find row with id '${id}' in table '${name}'`);
        }

        selectedRow.delete();
        selectedTable.save();


        res.status(HTTPStatus.OK).send();
    } catch(e) {
        console.error(e);
        res.status(HTTPStatus.NOT_MODIFIED).send(e.message);
    }   
}

export function rowByParams(req, res) {
    try {
        const DB_PATH = process.env.DB_PATH
        const { databaseName, name } = req.params;
        const { field, data, comparison } = req.query;

        const selectedTable = DB.selectDatabase(databaseName, DB_PATH).selectTable(name);

        selectedTable.selectRow(field, data, comparison).forEach(r => r.delete());
        selectedTable.save();

        res.status(HTTPStatus.OK).send();
    } catch(e) {
        console.error(e);
        res.status(HTTPStatus.NOT_FOUND).send(e.message);
    }   
}