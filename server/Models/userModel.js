const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
      },
      Email: {
        type: String,
        required: true,
        unique: true,
      },
      RollNo: {
        type: String,
        required: true,
        unique: true,
      },
      Status: {
        type: String,
        required: true,
        enum: ['active', 'inactive','under_verfication', 'verified', 'banned'],
      },
      OTP: {
        type: String,
        required: true,
      },
      Phone: {
        type: String,
        required: true,
        unique: true,
      },
      Password: {
        type: String,
        required: true,
      },
      AccountType: {
        type: String,
      },
      UserType: {
        type: String,
      },
      Wallet : {
        type : Number,
        default: 0,
      }

})

module.exports = mongoose.model('Profile', userSchema);