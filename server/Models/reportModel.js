const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
     
      postId: {
        type: String,
      },
      reporterId: {
        type: String,
        required: true,
      },
      reportType:{
        type: String,
        required: true,
       
      },
      victimId:{
        type: String,
        required: true,
       
      },
})

module.exports = mongoose.model('reports', reportSchema);


