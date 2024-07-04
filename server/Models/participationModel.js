const mongoose = require('mongoose');

const participationSchema = new mongoose.Schema({
     
      reqId: {
        type: String,
        required: true,
      },
      participantId: {
        type: String,
        required: true,
      },
})

module.exports = mongoose.model('participations', participationSchema);


