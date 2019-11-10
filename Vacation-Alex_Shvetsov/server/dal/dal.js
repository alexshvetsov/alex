const mysql = require('mysql');

//create a communecation line to mysql database

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "vacations_project"
});

connection.connect(err => {
    if (err) {
        console.log(err)
        return;
    }
    console.log('wee are live')
});

function execute(sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) {
                reject(err);
                return
            }
                    resolve(result);

                })
    })
}

module.exports ={execute};