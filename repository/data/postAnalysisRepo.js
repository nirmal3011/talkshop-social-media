class PostAnalysisRepo {
    constructor(helper, cloudSqlHelper) {
        this.helper = helper;
        this.cloudSqlHelper = cloudSqlHelper;
        this.tableName = 'POST_ANALYSIS';
    }

    /**
     * insert data in post_analysis table
     * @param {String} postId postId
     * @param {JSON} analysis analysis
     * @memberOf PostAnalysisRepo
     */
    async put(postId, analysis) {
        const query = {
            sql: `INSERT INTO ${this.tableName} (id, analysis) VALUES (?,?)`,
            params: [postId, JSON.stringify(analysis)]
        }
        const [err, resp ] = await this.helper.invoker(this.cloudSqlHelper.execute({ query }));
        if (err) {
            return Promise.reject(err);
        }
        else if (resp && resp[0] && resp[0].affectedRows == 1) {
            return true;
        }
        return false;
    }

    /**
     * get data from post_analysis table
     * @param {String} postId postId
     * @param {Array<String>} projections projections
     * @memberOf PostAnalysisRepo
     */
    async get(postId, projections) {
        if(!projections) {
            projections = "*";
        } else {
            projections = projections.join(',')
        }
        const query = {
            sql: `SELECT ${projections} FROM ${this.tableName} WHERE ID=?`,
            params: [postId]
        }
        const [err, resp ] = await this.helper.invoker(this.cloudSqlHelper.execute({ query }));
        if (err) {
            return Promise.reject(err);
        }
        else if (resp.length && resp[0].length) {
            const {analysis} = resp[0][0]
            return analysis;
        }
        return null;
    }
}

module.exports = PostAnalysisRepo;