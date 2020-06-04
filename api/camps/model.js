const mongoose = require('mongoose')

const campSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date: {
        type: Date,
        default: new Date()
    },
    status: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Owner',
        required: true
    },
    photo: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    start_date: {
        type: Date
    },
    end_date: {
        type: Date
    },
    place: {
        type: String
    },
    age_limit: {
        type: String
    },
    //shilts
    shilts_title: {
        type: String
    },
    shilts_price: {
        type: Number
    },
    //shilts/
    price: {
        type: Number
    },
    logo: {
        type: String
    },
    rate: {
        type: String
    },
    service_aprove: {
        type: String
    },
    director: {
        type: String
    },
    //desc
    about: {
        type: String
    },
    food: {
        type: String
    },
    stay: {
        type: String
    },
    infrastructure: {
        type: String
    },
    program: {
        type: String
    },
    med_service: {
        type: String
    },
    safety: {
        type: String
    },
    transfer: {
        type: String
    },
    message_admin_camp: {
        type: String
    },
    motivation: {
        type: String
    },
    //desc/
    category: [{
        type: String,
        ref: "CategoryCamp",
    }]
})

module.exports = mongoose.model('Camp', campSchema)