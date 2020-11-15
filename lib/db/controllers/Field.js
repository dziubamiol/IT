import validator from './../validators/index.js';
import parser from './../parsers/index.js';

const FIELD_TYPES = {
    NUMBER : {
        validator : validator.number,
        parser    : parser.number
    },
    STRING : {
        validator : validator.string,
        parser    : parser.string
    }
}

/**
 * Field entity
 * @constructor
 * @param {string} name
 * @param {string} type
 */
class Field {
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }

    /**
     * Validate field data
     * @param {Any} data 
     * @returns {boolean}
     */
    validate(data) {
        return FIELD_TYPES[this.type].validator(data);
    }

    /**
     * Parse field data
     * @param {Any} data 
     * @returns {Any}
     */
    parse(data) {
        return FIELD_TYPES[this.type].parser(data);
    }
}

export default Field;