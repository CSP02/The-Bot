const mongoose = require('mongoose')
require('dotenv').config();

module.exports = async () => {
    await mongoose.connect("mongoDb path ",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    return mongoose
}