const express = require('express');
const particiaptionController = require('../Controllers/participationController');

const router = express.Router();

router.get('/get/:id', particiaptionController.getAllParticipationByRequestId);
router.post('/add',particiaptionController.participate);


module.exports = router;