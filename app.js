import DB from './lib/db/index.js';

const DB_PATH = '/Users/mishadziuba/Documents/University/ITDB';

const db = DB.createDatabase('testDB', DB_PATH);
console.log(db);