const mongoose = require('mongoose');
const warnSchema = mongoose.Schema({
  guildId: {
    type: String,
    require: true
  },
  warnings: {
    type: [Object],
    require: true
  }
})

module.exports = mongoose.model('warnings', warnSchema)