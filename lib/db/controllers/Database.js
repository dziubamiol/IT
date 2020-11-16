import Table from './Table.js';
import path from 'path';
import fs, { rmdirSync } from 'fs';
import Field from './Field.js';

/**
 * Database entity
 * @constructor
 * @param {string} name
 * @param {string} fsPath
 */
class Database {
    constructor(name, fsPath) {
        this.name = name;
        this.dbPath = path.join(fsPath, name)
        this.data = new Date();
        this.tables = this.initTables();
    }

    initTables() {
        const { dbPath } = this;

        if (!fs.existsSync(dbPath)) throw new Error(`Folder '${dbPath}' with databases doesn't exists`);

        return fs.readdirSync(dbPath).filter(f => fs.statSync(path.join(dbPath, f)).isDirectory());
    }


    /**
     * Create and return Table entity
     * @param {string} name
     * @returns {Table}
     */
    createTable(name, fields) {
        const { dbPath } = this;
        const tablePath = path.join(dbPath , name);

        if (fs.existsSync(tablePath)) throw new Error(`Table with name '${name}' exists`);

        const tableConfigFilePath = path.join(tablePath, 'fields.json');

        const fieldNamesSet = new Set();
        const fieldNamesList = [];

        const fieldsConfig = fields.map(f => {
            fieldNamesSet.add(f.name);
            fieldNamesList.push(f.name);

            return {
                name: f.name,
                type: f.type
            }
        });

        if (fieldNamesSet.size !== fieldNamesList.length) throw new Error('Field names have duplicates');

        fs.mkdirSync(tablePath);

        fs.writeFileSync(tableConfigFilePath, JSON.stringify(fieldsConfig));

        return new Table(name, fields, dbPath);
    }


    /**
     * Drop Table from DB
     * @param {string} name 
     * @returns {boolean}
     */
    dropTable(name) {
        const { dbPath } = this;
        const tablePath = path.join(dbPath, name);

        if (!fs.existsSync(tablePath)) throw new Error(`Table with name '${name}' doesn't exists`);

        fs.rmdirSync(tablePath);

        return true;
    }

    /**
     * Select Table entity
     * @param {string} name 
     * @returns {Table}
     */
    selectTable(name) {
        const { dbPath } = this;
        const tablePath = path.join(dbPath, name);

        if (!fs.existsSync(tablePath)) throw new Error(`Table with name '${name}' doesn't exists`);

        const tableConfigFilePath = path.join(tablePath, 'fields.json');

        const fieldsConfig = JSON.parse(fs.readFileSync(tableConfigFilePath));
        const fields = fieldsConfig.map(f => new Field(f.name, f.type));

        return new Table(name, fields, dbPath);
    }

    /**
     * Create Database instance
     * @param {string} name 
     * @param {string} fsPath 
     */
    static createDatabase(name, fsPath) {
        const dbPath = path.join(fsPath, name);

        if (fs.existsSync(dbPath)) throw new Error(`Database with name '${name}' exists`);

        fs.mkdirSync(dbPath);

        return new Database(name, fsPath);
    }

    /**
     * Select Database entity
     * @param {string} name 
     */
    static selectDatabase(name, fsPath) {
        const dbPath = path.join(fsPath, name);

        if (!fs.existsSync(dbPath)) throw new Error(`Database with name '${name}' doesn't exists`);

        return new Database(name, fsPath);    
        
    }

    static listDatabasesNames(fsPath) {
        if (!fs.existsSync(fsPath)) throw new Error(`Folder '${fsPath}' with databases doesn't exists`);

        return fs.readdirSync(fsPath).filter(f => fs.statSync(path.join(fsPath, f)).isDirectory());
    }

    /**
     * Drop database
     */
    dropDatabase() {
        const { dbPath } = this;

        fs.rmdirSync(dbPath, { recursive: true });
    }
}

export default Database;