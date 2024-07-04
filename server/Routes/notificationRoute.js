const express = require('express');
const notificationController = require('../Controllers/notificationController');

const router = express.Router();

router.get('/get/:id', notificationController.getAllNotificationByRecieverId);
router.post('/add',notificationController.notify);
router.post('/broadcast/:id', notificationController.notifytoallaboutlink);


module.exports = router;