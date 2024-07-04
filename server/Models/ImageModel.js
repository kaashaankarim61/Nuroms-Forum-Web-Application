const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({

      Image: {
        type: String,
      },
      ImgHolder :{
        type: String,
      }
    })

module.exports = mongoose.model('Images', ImageSchema);