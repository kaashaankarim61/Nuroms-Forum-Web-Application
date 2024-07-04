const express = require('express');
const bioController = require('../Controllers/bioController');

const router = express.Router();

router.post('/add', bioController.addBio);
router.put('/put',bioController.updateBio);
router.get('/get/:id',bioController.getBioById);

module.exports = router;