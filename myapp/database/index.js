const mysql = require('mysql2');
const configs = require('../config/database.json');


module.exports = {
    executeQuery: (sql, params = null) => {

        const conn = mysql.createConnection({
            host: configs.server,
            user: configs.user,
            database: configs.database,
            port: configs.port,
            password: configs.pass
        });
        return new Promise(function (resolve, reject) {
            try {



                if (params) {

                    conn.promise().query(sql, params, (err, results) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(results);

                        }
                        conn.close();

                    });

                } else {
                    conn.promise().query(sql, (err, results) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(results);

                        }
                        conn.close();

                    });
                }

            } catch (error) {
                reject(error);
            }
        });
    }


}