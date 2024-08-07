const mongoose = require("mongoose");

const infraction = new mongoose.Schema({
        guildId: {
            type: Number,
            require: true
        },
        infractions: {
            type: [Object],
            require: true
        }
    })

module.exports = mongoose.model("Infraction", infraction);