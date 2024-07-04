const express = require('express');
const upVoteController = require('../Controllers/upVoteController');

const router = express.Router();

router.post('/add', upVoteController.addUpVote);
router.get('/get/:id',upVoteController.getAllUpvotesbyId);
router.delete('/delete/:id/:voter', upVoteController.deleteUpvotesbyId);

module.exports = router;