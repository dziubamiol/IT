import Field from './lib/db/controllers/Field.js';
import DB from './lib/db/index.js';
import { v4 as uuid } from 'uuid';

const DB_PATH = '/Users/mishadziuba/Documents/University/ITDB';

console.log('----------------------create DB----------------------');
const db = DB.createDatabase('testDB', DB_PATH);
console.log(db);

console.log('----------------------create Table----------------------');
const fields = [
    new Field('name', 'STRING'),
    new Field('number', 'NUMBER')
];
const table = db.createTable('testTable', fields);
console.log(table);

console.log('----------------------create rows----------------------');

for (let i = 0; i < 3; i++) {
    const rowData = {
        name : uuid(),
        number : Math.random()
    }

    const row = table.insertRow(rowData);
    console.log(row);
}

console.log('----------------------save table changes----------------------');
table.save();

console.log('----------------------open created DB----------------------');
const dbCopy = DB.selectDatabase('testDB', DB_PATH);
console.log(db);

console.log('----------------------select created Table----------------------');
const tableCopy = dbCopy.selectTable('testTable');
console.log(tableCopy);

console.log('----------------------update Table rows----------------------');
const rowData = {
    name : uuid(),
    number : Math.random()
}

const row = tableCopy.insertRow(rowData)
console.log(row);
console.log(tableCopy);
console.log('----------------------save table changes----------------------');
tableCopy.save();

console.log('----------------------select row from table eql----------------------');
let etalonRow = tableCopy.rows[0];
let nameToSearch = etalonRow.data.name;
console.log('searched name', nameToSearch);

let searchedRow = tableCopy.selectRow('name', nameToSearch, 'eql');
console.log(searchedRow);

console.log('----------------------select row from table cont----------------------');
etalonRow = tableCopy.rows[1];
nameToSearch = etalonRow.data.name.substring(0, 5);
console.log('searched name', nameToSearch);

searchedRow = tableCopy.selectRow('name', nameToSearch, 'cont');
console.log(searchedRow);

console.log('----------------------remove row from table----------------------');
console.log('table before');
console.log(tableCopy);

searchedRow[0].delete();

console.log('table after');
console.log(tableCopy);

console.log('----------------------save table changes----------------------');
tableCopy.save();

console.log('----------------------update row from table----------------------');
etalonRow = tableCopy.rows[0];

console.log('row to update');
console.log(etalonRow);
nameToSearch = etalonRow.data.name;

let updatedRow = tableCopy.selectRow('name', nameToSearch, 'eql')[0].update('name', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
console.log('updated row');
console.log(updatedRow);

console.log('updated table');
console.log(tableCopy);

console.log('----------------------save table changes----------------------');
tableCopy.save();

console.log('----------------------list databases names----------------------');
const dbs = DB.listDatabasesNames(DB_PATH);
console.log(dbs);

// console.log('----------------------drop database----------------------');
// dbCopy.dropDatabase();