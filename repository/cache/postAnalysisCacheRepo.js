class PostAnalysisCacheRepo {

    /**
     * @param {Object} logger logger
     * @param {Object} utility utility
     * @param {Helper} helper helper
     * @param {Object} constants constants
     * @param {Object} postAnalysisRedisClient postAnalysisRedisClient
     *
     */
    constructor (helper, postAnalysisRedisClient) {
        this.helper = helper;
        this.redisClient = postAnalysisRedisClient;
        this.EXPIRY_TIME = 60;
    }

    getKey(postId) {
        return `postId:analysis:${postId}`;
    }

    /**
     * gets the value of a key
     * @param {String} postId postId
     * @returns {Promise} value corresponding to the key or null
     * @memberOf PostAnalysisCacheRepo
     */
    get(postId) {
        return new Promise((resolve, reject) => {
            const redisKey = this.getKey(postId);
            this.redisClient.get(redisKey, (err, data) => {
                if (err) {
                    return reject(err);
                }
                return resolve(data);
            });
        });
    }

    /**
     * gets the value of key
     * @param {String} postId postId
     * @param {Object} val val
     * @returns {Promise<Array>} the array consisting of outputs of command in commandArray
     * @memberOf PostAnalysisCacheRepo
     */
    add(postId, val) {
        const redisKey = this.getKey(postId);
        return new Promise(async (resolve, reject) => {
            let res = await this.redisClient.get(redisKey);
            res = JSON.parse(res || '{}');
            for (let key of Object.keys(val)) {
                res[key] = val[key];
            }
            await this.redisClient.setex(redisKey, this.EXPIRY_TIME, JSON.stringify(res), (err, data) => {
                if (err) {
                    return reject(err);
                }
                return resolve(data);
            });
        });
    }
}

module.exports = PostAnalysisCacheRepo;
