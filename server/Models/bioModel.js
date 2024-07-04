const mongoose = require('mongoose');

const bioSchema = new mongoose.Schema({
     
      UserId : {
        type: String,
        required: true,
      },
      BioText: {
        type: String,
        required: true,
      },
      Campus: {
        type: String,
      },
      Semester: {
        type: String,
      },
      Degree : {
        type : String,
      },
      UserType : {
        type :  String,
      },
      Years: {
        type: String,
      }
})

module.exports = mongoose.model('bios', bioSchema);


