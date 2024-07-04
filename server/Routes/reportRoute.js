const express = require('express');
const reportController = require('../Controllers/reportController');

const router = express.Router();

router.post('/add', reportController.fileReport);


module.exports = router;