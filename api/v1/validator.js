class Validator {

    /**
     * @param {object} object object to be validated
     * @param {string} schemaName schema name
     * @returns {object} validated data
     */
    validate(object, schema) {
        return new Promise((resolve, reject) => {
            if (!object) {
                return reject(`Invalid input object: ${object}`);
            }

            const { error, value } = schema.validate(object);
            if (error) {
                const errMsg = error.details && error.details.length ? error.details[0].message : error.message;
                return reject(errMsg);
            }
            return resolve(value);
        });
    }
}


module.exports = Validator