const express = require('express');
const imageController = require('../Controllers/imageController');

const router = express.Router();

router.post('/add', imageController.addImage);
router.get('/get/:id',imageController.getImage);
router.put('/put',imageController.updateImage);

module.exports = router;