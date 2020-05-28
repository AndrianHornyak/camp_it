const mongoose = require('mongoose')

const ownerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        required: true
    },
    date:{
        type:Date,
        default:new Date()
    },
    name: {
        type: String
    },
    phone:{
        type: String,
    },
    telegram:{
        type: String
    },
    site:{
        type:String,
    },
    is_procent_fee:{
        type:Boolean,
    },
    procent_fee:{
        type:String
    },
    is_fixed_fee:{
        type: Boolean
    },
    fixed_fee:{
        type: String
    },
    blocked:{
        type: Boolean
    }
})



module.exports = mongoose.model('Owner', ownerSchema)