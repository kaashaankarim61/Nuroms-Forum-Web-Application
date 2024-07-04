const express = require('express');
const commentController = require('../Controllers/commentController');

const router = express.Router();

router.post('/add', commentController.addComment);
router.get('/get/:postId', commentController.getAllComments);

module.exports = router;