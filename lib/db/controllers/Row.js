import { v4 as uuid } from 'uuid';
import Field from './Field.js';

/**
 * Row entity
 * @constructor
 * @param {Fields} fields
 * @param {Any} data
 */
class Row {
    constructor(fields, data, table, id) {
        this.id = id ? id : uuid();
        this.fields = fields;
        this.data = this.initData(data);
        this.table = table;
    }

    initData(data) {
        const { fields } = this;
        const parsedData = {};

        fields.forEach(f => {
            const dataField = data[f.name];

            if (f.validate(dataField)) {
                parsedData[f.name] = f.parse(dataField);
            } else {
                throw new Error(`Invalid data '${dataField}' of type ${f.type} provided`);
            }
        });

        return parsedData;
    }

    /**
     * Update field at Row
     * @param {string} fieldName 
     * @param {Any} data 
     * @returns {boolean}
     */
    update(fieldName, newData) {
        const { fields, data } = this;
        const fieldToUpdate = fields.filter(f => f.name === fieldName)[0];        

        if (!fieldToUpdate) throw new Error(`Invalid column name ${fieldName}, no such column exists`);

        if(fieldToUpdate.validate(newData)) {            
            data[fieldName] = fieldToUpdate.parse(newData);
        } else {
            throw new Error(`Invalid data '${newData}' of type ${fieldToUpdate.type} provided`);
        }

        return this;
    }

    /**
     * delete Row with data
     */
    delete() {
        const { table, id } = this;

        table.deleteRow(id);
    }
}

export default Row;