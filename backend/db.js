const mysql = require('mysql2');
require('dotenv').config();

const user = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;
const host = process.env.DB_HOST;

const db = mysql.createConnection(
    {
        host,
        user,
        password,
        database
    }
)


db.connect((err) => {
    if (err) {
        console.error('Error connecting to MYSQL database: ' + err);
        return;
    }
    console.log('Connected to MYSQL DB as ID: ', db.threadId)
});

module.exports = db;