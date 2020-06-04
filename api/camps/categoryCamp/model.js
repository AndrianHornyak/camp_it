const mongoose = require('mongoose')

const categoryCampSchema = mongoose.Schema({
    _id: String
})

module.exports = mongoose.model('CategoryCamp', categoryCampSchema)