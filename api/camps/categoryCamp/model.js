const mongoose = require('mongoose')

const categoryCampSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    categoryName:{
        type: String,
        required:true
    }

})

module.exports = mongoose.model('CategoryCamp', categoryCampSchema)