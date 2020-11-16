import DB from './../../db/index.js';
import * as HTTPStatus from 'http-status-codes';
import { table } from './get.js';


export function row(req, res) {
    try {
        const DB_PATH = process.env.DB_PATH
        const { databaseName, name, id } = req.params;
        const { data } = req.body;

        console.log(databaseName, DB_PATH);
        

        const selectedTable = DB.selectDatabase(databaseName, DB_PATH).selectTable(name);
        

        const selectedRow = selectedTable.rows.filter(r => r.id === id)[0];

        if (!selectedRow) {
            res.status(HTTPStatus.NOT_FOUND).send(`Cannot find row with id '${id}' in table '${name}'`);
        }

        const updatedRow = { ...selectedRow.update(data.field, data.data) };

        selectedTable.save();

        delete updatedRow.fields;
        delete updatedRow.table;

        res.status(HTTPStatus.OK).json(updatedRow);
    } catch(e) {
        console.error(e);
        res.status(HTTPStatus.NOT_MODIFIED).send(e.message);
    }   
}