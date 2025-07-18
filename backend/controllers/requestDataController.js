const { default: axios } = require("axios");
const requestData = require("../models/requestDataModel");
const { getTimeAgo } = require("../utils/time");

exports.getAll = (req, res) => {
    requestData.getAll((err, data) => {
        if (err) return res.status(500).send(err);
        console.log(data);

        return res.send(data);
    })
};

exports.getHistory = (req, res) => {
    const { groupBy } = req.query;
    requestData.getHistory(groupBy, (err, result) => {
        if (err) return res.status(500).send(err);
        else {
            let grouped = [];
            if (groupBy === 'url') {
                grouped = result.reduce((acc, row) => {
                    if (!acc[row.url]) acc[row.url] = [];
                    acc[row.url].push({
                        id: row.id,
                        method: row.method,
                        requested_at: row.requested_at,
                        url: row.url
                    });
                    return acc;
                }, {});
            } else {
                grouped = result.reduce((acc, row) => {
                    const timeAgo = getTimeAgo(row.requested_at);
                    if (!acc[timeAgo]) acc[timeAgo] = [];
                    acc[timeAgo].push({
                        id: row.id,
                        method: row.method,
                        requested_at: row.requested_at,
                        url: row.url
                    });
                    return acc;
                }, {});
            }


            const groupedArray = Object.entries(grouped).map(([url, requests]) => ({
                url,
                requests
            }));

            res.json(groupedArray);
        }
    })
}

exports.sendRequest = async (req, res) => {
    const { url, method, parameters, headers, authorization, pre_request_script, post_request_script, variables, body } = req.body;
    // console.log(req.url, req.method, req.body);

    const time = new Date();
    const start = Date.now();
    try {
        const axiosConfig = {
            method: method.toLowerCase(),
            url,
            validateStatus: () => true
        }
        const end = Date.now();
        const responseTime = end - start;
        console.log(time);
        const axiosResponse = await axios(axiosConfig);
        console.log(axiosResponse, axiosResponse.headers.date);
        requestData.sendRequest(method, url, JSON.stringify(parameters), JSON.stringify(headers), JSON.stringify(authorization),
            JSON.stringify(pre_request_script), JSON.stringify(post_request_script), JSON.stringify(variables), JSON.stringify(body),
            time,
            (err, result) => {
                console.log(err, '<---->', result)
                if (err) return res.status(500).send("Failed to send request", err);
                else {
                    console.log(result, err, 'inside controller');
                    const request_id = result.insertId;

                    requestData.saveHistory(method, url, request_id, time, (err, result) => {
                        console.log(result, err, 'inside controller2');

                        if (err) return res.status(500).send("Failed to send request", err);

                        else
                            res.status(200).json({
                                status: axiosResponse.status,
                                statusText: axiosResponse.statusText,
                                headers: axiosResponse.headers,
                                data: axiosResponse.data,
                                responseTime: responseTime
                            })
                    })
                }
            })
    } catch (err) {
        console.log(err, 'fetch error')
    }

}

exports.restoreHistory = async (req, res) => {
    const { requested_at } = req.params;
    requestData.restoreHistory(requested_at, (err, result) => {
        console.log(err, 'history err')
        if (err) return res.status(500).send(err);

        return res.send(result);
    })
}

exports.clearAllHistoryData = async (req, res) => {
    requestData.clearAllHistory((err, result) => {
        console.log(err, 'history err')
        if (err) return res.status(500).send(err);

        return res.send(result);
    })
}