const mongoose = require('mongoose');
const giftsSchema = mongoose.Schema({
  userID: {
    type: String,
    require: true
  },
  gifts: {
    type: [Object],
    require: true
  }
})

module.exports = mongoose.model('gifts', giftsSchema)