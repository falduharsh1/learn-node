// import mysql from 'mysql2/promise';
const mysql = require("mysql2/promise")

// Create the connection pool. The pool-specific settings are the defaults

        const mysqlpool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            database: 'practicals',
            waitForConnections: true,
            connectionLimit: 10,
            maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
            idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0,
          });

module.exports = mysqlpool