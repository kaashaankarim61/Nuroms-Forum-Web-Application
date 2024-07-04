const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
     
      SenderId: {
        type: String,
        required: true,
      },
      RecieverId: {
        type: String,
        required: true,
      },
      MeetingLink: {
        type: String,
      },
      MeetingTime: {
        type: String,
      },
      MeetingDate: {
        type: Date,
      },
      CoachingTopic: {
        type: String,
      },
      CoachingId: {
        type: String,
      },
      Text : {
        type: String,
        required: true,
      }
})

module.exports = mongoose.model('Notification', notificationSchema);


