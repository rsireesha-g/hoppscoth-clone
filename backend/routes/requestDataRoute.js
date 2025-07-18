const express = require('express');
const router = express.Router();
const requestDataController = require('../controllers/requestDataController')

router.get("/", requestDataController.getAll);
router.post("/responseData", requestDataController.sendRequest);
router.get("/historyData", requestDataController.getHistory);
router.get("/historyData/:requested_at", requestDataController.restoreHistory);
router.delete("/historyData", requestDataController.clearAllHistoryData);

module.exports = router;