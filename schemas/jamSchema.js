const mongoose = require('mongoose');
const jamSchema = mongoose.Schema({
  guildId: {
    type: String,
    require: true
  },
  jam: {
    type: [Object],
    require: true
  }
})

module.exports = mongoose.model('jam', jamSchema)