const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    AuthorRoll: {
        type: String,
        required: true,
      },

      PostText: {
        type: String,
        required: true,
      },

      Status: {
        type: String,
        required: true,
        enum: ['active', 'inactive','reported', 'banned'],
      },

      Priority: {
        type: Number,
        required: true,
      },
      Date: {
        type: Date,
        required: true,
      },

      Badge: {
        type: String,
        enum: ['sponserred', 'authorized','credible', 'message'],
      },
    

})

module.exports = mongoose.model('posts', postSchema);


/*
{
        "AuthorRoll" : "20L-2171",
        "PostText": "Apple is red and garden is green",
        "Priority":9,
        "Status" : "active",
        "PostId":"CS-20L-2171-0001",
        "Date":"2023-04-01T09:30:00.000Z",
        "Badge" : "credible"   
}
*/