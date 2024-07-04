const express = require('express');
const postController = require('../Controllers/postController');

const router = express.Router();

router.post('/add', postController.addPost);
router.get('/get-all', postController.getAllPosts);

module.exports = router;