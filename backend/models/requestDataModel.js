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
    getHistory: (groupBy, callback) => {
        const sql = groupBy === 'url' ? 'SELECT * FROM HistoryData ORDER BY url' : 'SELECT * FROM HistoryData ORDER BY requested_at DESC'
        db.query(sql, callback)
    },
    restoreHistory: (requested_at, callback) => {
        // const date = new Date(requested_at).toISOString().slice(0, 19).replace('T', ' ');
        const sql = `SELECT * FROM HistoryData WHERE requested_at='${requested_at}'`;
        db.query(sql, callback);
    },
    clearAllHistory: (callback) => {
        const sql = 'DELETE FROM HistoryData WHERE id>0;';
        db.query(sql, callback);
    }
};

module.exports = requestData;