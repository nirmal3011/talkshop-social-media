class PostRepo {
    constructor(helper, cloudSqlHelper) {
        this.helper = helper;
        this.cloudSqlHelper = cloudSqlHelper;
        this.tableName = 'post';
    }

    /**
     * insert data in post table
     * @param {String} postId postId
     * @param {String} content content
     * @param {String} authorId authorId
     * @memberOf PostRepo
     */
    async put(postId, content, authorId) {
        const query = {
            sql: `INSERT INTO ${this.tableName} (id, content, authorId) VALUES (?,?,?)`,
            params: [postId, content, authorId]
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
}

module.exports = PostRepo;