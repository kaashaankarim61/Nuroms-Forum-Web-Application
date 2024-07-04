const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
     
      
      MeetingLink: {
        type: String,
      },
      MeetingMessage : {
        type: String,
        required: true,
      },
      Time : {
        type: String,
        required: true,
      }
})

module.exports = mongoose.model('Meeting', meetingSchema);


