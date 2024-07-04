const express = require('express');
const userController = require('../Controllers/userController');

const router = express.Router();

router.post('/add', userController.addUser);
router.post('/get',userController.getUserByEmail);
router.get('/get/:roll',userController.getUserByRoll);
router.get('/get/id/:id',userController.getUserById);
router.get('/instructors',userController.getInstructors);
router.put('/update/status', userController.updateUserStatus);
router.put('/update/wallet', userController.updateUserWallet);

module.exports = router;