const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({

      
      CommenteeRoll: {
        type: String,
        required: true,
      },

      CommentText: {
        type: String,
        required: true,
      },


      PostId: {
        type: String,
        required: true,
        
       
      },
      Status: {
        type: String,
        // required: true,
        enum: ['active', 'inactive','reported', 'banned'],
      },

      Priority: {
        type: Number,
        // required: true,
      },
      Date: {
        type: Date,
        // required: true,
      },

      Badge: {
        type: String,
        enum: ['Sponserred', 'Authorized','Credible', 'Message'],
      },
    

})

module.exports = mongoose.model('comments', commentSchema);