class Helper {

    /**
     *Creates an instance of Helper.
     * @memberof Helper
     */
    constructor() {}

    /**
     * Simplifies async-await try-catch
     * @param {any} promise The promise.
     * @returns {Array<object>} The array of [ err, data ].
     * @memberof Util
     */
    invoker(promise) {
        return promise.then((data) => {
                return [ null, data ];
            })
            .catch((err) => {
                return [ err, null ];
            });
    }

    /**
     *
     * @param {Object} err Error object in case any
     * @param {Object} data data to be sent in response
     * @param {Object} res response object
     * @returns {Object}
     * @memberOf Helper
     */
    writeResponse(err, data, res) {
        if (err) {
            res.status(err.code && Number.isInteger(err.code) ? err.code : 500);
            return res.send(err.msg ? err.msg : err);
        }
        res.status(res.statusCode? res.statusCode : 200);
        return res.json(data);
    }

    analyzeText(text) {
        // Remove extra whitespaces and split the text into words
        const words = text.trim().split(/\s+/);

        // Calculate the number of words
        const numberOfWords = words.length;

        // Calculate the total length of all words
        const totalWordLength = words.reduce((total, word) => total + word.length, 0);

        // Calculate the average word length (rounded to 2 decimal places)
        const averageWordLength = numberOfWords > 0 ? (totalWordLength / numberOfWords).toFixed(2) : 0;

        // Return the analysis results
        return {
            numberOfWords,
            averageWordLength,
        };
    }

}

module.exports = Helper;
