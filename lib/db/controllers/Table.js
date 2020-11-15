import path from 'path';
import fs from 'fs';
import Row from './Row.js';
import comparators from './../utils/comparators.js';

/**
 * Table entity
 * @constructor
 * @param {string} name
 * @param {Array} fields
 */
class Table {
    constructor(name, fields, dbPath) {
        this.name = name;
        this.fields = fields;
        this.dbPath = dbPath;
        this.date = new Date();
        this.rows = this.initRows();
    }

    /**
     * Init rows on Table init
     */
    initRows() {
        const { fields, name, dbPath } = this;
        const rowsPath = path.join(dbPath, name, 'data.json');

        if (fs.existsSync(rowsPath)) {
            const rows = JSON.parse(fs.readFileSync(rowsPath));

            return rows.map(r => new Row(fields, r.data, this, r.id));
        }

        fs.writeFileSync(rowsPath, JSON.stringify([])); // if not exists

        return [];
    }

    /**
     * Insert row to the Table
     * @param {Any} data 
     * @returns {Row}
     */
    insertRow(data) {
        const { fields } = this;
        const newRow = new Row(fields, data, this);

        this.rows.push(newRow);

        return newRow;
    }

    save() {
        const { name, dbPath, rows } = this;
        const rowsPath = path.join(dbPath, name, 'data.json');

        fs.writeFileSync(rowsPath, JSON.stringify(rows, (k, v) => {    
            if (['fields', 'table'].includes(k)) return;
            
            return v;
        }));
    }

    selectRow(searchParameter, searchData, comparator) {
        const { rows, fields } = this;

        if (fields.filter(f => f.name === searchParameter).length === 0) throw new Error(`No such field '${searchParameter}' exists in table`)

        return rows.filter(r => {
            if (!Object.keys(comparators).includes(comparator)) throw new Error(`Invalid comparator type: '${comparator}'`)

            return comparators[comparator](r.data[searchParameter], searchData);
        });
    }

    deleteRow(rowId) {
        const { rows } = this;
        const rowIndex = rows.findIndex(r => r.id === rowId);

        if (rowIndex === -1) throw new Error(`No such row with id ${rowId} exists`);

        this.rows.splice(rowIndex, 1);

        return true;
    }
}

export default Table;