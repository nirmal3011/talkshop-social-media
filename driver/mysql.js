const mysql = require('mysql2');
const {cloudSql} = require("../config/stage-config");

// creating mysql pool
const mysqlPool = mysql.createPool({
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    host: cloudSql.host,
    database: cloudSql.database,
});

module.exports = {mysqlPool};
