

const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
     
    
      Topic: {
        type: String,
        required: true,
      },

      Course: {
        type: String,
      },

      Brief: {
        type: String,
        required: true,
      },

      DateCreated: {
        type: Date,
        required: true,
      },

      ClosingDate: {
        type: Date,
        required: true,
      },
      


      Visibility: {
        type: Number,
        required: true,
        enum: [0,1],
      },

      SessionType: {
        type: Number,
        required: true,
        enum: [0,1,2],
      },

      Duration: {
        type: Number,
        required: true,
      },

      RequestOwner: {
        type: String,
        required: true,
      },

      Instructor: {
        type: String,
        required: true,
      },

      BiddingPrice: {
        type: Number,
        required: true,
      },    

      Status:{
        type: String,
        required: true,
      }

})



module.exports = mongoose.model('requests', requestSchema);


