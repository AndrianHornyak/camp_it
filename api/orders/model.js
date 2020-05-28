const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    camp: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Camp',
        required: true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Owner',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    price: {
        type: Number,
    },
    date:{
        type:Date,
        default:new Date()
    },
    
})


module.exports = mongoose.model('Order', orderSchema)