const mongoose = require('mongoose');
const rulesSchema = mongoose.Schema({
  guildId: {
    type: String,
    require: true
  },
  rules: {
    type: [Object],
    require: true
  }
})

module.exports = mongoose.model('rules', rulesSchema)