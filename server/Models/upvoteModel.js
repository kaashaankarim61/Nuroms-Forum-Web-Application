const mongoose = require('mongoose');

const upVoteSchema = new mongoose.Schema({
     
      postId: {
        type: String,
        required: true,
      },
      voterId: {
        type: String,
        required: true,
      },
})

module.exports = mongoose.model('upVotes', upVoteSchema);


