import DB from './../../db/index.js';
import * as HTTPStatus from 'http-status-codes';

export function tables(req, res) {
    try {
        const DB_PATH = process.env.DB_PATH;
        const database = DB.selectDatabase(req.params.database, DB_PATH);

        res.status(HTTPStatus.OK).json(database.tables);
    } catch(e) {
        console.error(e);
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send(e.message);
    }
}

export function table(req, res) {
    try {
        const DB_PATH = process.env.DB_PATH
        const { database, table } = req.params;
        const includes  = req.query.includes.split(',')        

        const selectedTable = { ...DB.selectDatabase(database, DB_PATH).selectTable(table) };

        if (includes && includes.includes('rowsCount')) {
            selectedTable.rowsCount = selectedTable.rows.length;
        }

        if (includes && includes.includes('rows')) {
            selectedTable.rows.forEach(r => {
                delete r.fields; // remove redundant
                delete r.table; // remove circular dep.
            });
        } else {            
            delete selectedTable.rows;
        }


        res.status(HTTPStatus.OK).json(selectedTable);
    } catch(e) {
        console.error(e);
        res.status(HTTPStatus.NOT_FOUND).send(e.message);
    }
}

export function row(req, res) {
    try {
        const DB_PATH = process.env.DB_PATH
        const { database, table } = req.params;
        const { field, data, comparison } = req.query;

        const selectedTable = DB.selectDatabase(database, DB_PATH).selectTable(table);

        console.log(field, data, comparison);
        

        const selectedRows = selectedTable.selectRow(field, data, comparison).map(r => {
            const row = { ...r };

            delete row.fields;
            delete row.table; 

            return row;
        });

        res.status(HTTPStatus.OK).json(selectedRows);
    } catch(e) {
        console.error(e);
        res.status(HTTPStatus.NOT_FOUND).send(e.message);
    }   
}