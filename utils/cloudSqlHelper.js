class CloudSqlHelper {

    /**
     *Creates an instance of Helper.
     * @param {Object} mysqlPool mysqlPool
     * @memberof Helper
     */
    constructor(mysqlPool) {
        this.mysqlPool = mysqlPool;
    }

    /**
     * @desc execute cloud sql query by connection pool
     * @param query
     * @return {Promise<*[]>}
     */
    async execute(query) {
        let connection;
        try {
            //fetch connection pool
            const pool = await this.mysqlPool;
            //get connection from pool
            connection = await pool.promise().getConnection();
            //if connection successfully fetched, query on database
            const {sql, params} = query.query;
            const results = await connection.query(sql, params);
            return results || [];
        } catch (err) {
            throw err;
        } finally {
            if (connection) {
                await connection.release();
            }
        }
    }
}

module.exports = CloudSqlHelper;