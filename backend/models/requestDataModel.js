const db = require("../db");

const requestData = {
    getAll: (callback) => {
        db.query('SHOW TABLES', callback)
    },
    sendRequest: (method, url, parameters, headers, authorization, pre_request_script, post_request_script, variables, body, time, callback) => {
        const sql = `INSERT INTO RequestData (method,url, parameters, headers, authorization, pre_request_script, post_request_script, variables,body,requested_at) VALUES (?,?,?,?,?,?,?,?,?,?)`;
        db.query(sql, [method, url, parameters, headers, authorization, pre_request_script, post_request_script, variables, body, time], callback)
    },
    saveHistory: (method, url, request_id, requested_at, callback) => {
        const sql = `INSERT INTO HistoryData (method,url,request_id, requested_at) VALUES(?,?,?,?)`;
        db.query(sql, [method, url, request_id, requested_at], callback);
    },
    getHistory: (callback) => {
        db.query('SELECT * FROM HistoryData ORDER BY url', callback)
    }
};

module.exports = requestData;