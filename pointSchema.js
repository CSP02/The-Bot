const mongoose = require('mongoose');
const pointsSchema = mongoose.Schema({
    guildId: {
        type: String,
        require: true
    },
    userId: {
        type: String,
        require: true
    },
    points: {
        type: [Object],
        require: true
    }
})

module.exports = mongoose.model('points', pointsSchema)