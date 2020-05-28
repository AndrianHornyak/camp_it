const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    camp: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Camp',
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Owner',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    date: {
        type: Date,
        default: new Date()
    },
    rate: {
        type: String,
    },
    food_rate: {
        type: String,
    },
    stay_rate: {
        type: String,
    },
    infua_rate: {
        type: String,
    },
    program_rate: {
        type: String,
    },
    med_sec_rate: {
        type: String,
    },
    safety: {
        type: String,
    },
    communication: {
        type: String,
    },
    recommendation: {
        type: String,
    }

})


module.exports = mongoose.model('Comment', commentSchema)