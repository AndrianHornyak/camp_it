const mongoose = require('mongoose')
const Camp = require('../../camps/model.js')
const CategoryCamp = require('./model')
const Admin = require('../../admin/model.js')


exports.get_all = async (req, res, next) =>{
    try {
        const admin = await Admin.findById(req.body.adminId)
    let category  = await CategoryCamp.find()
    res.status(200).json({
        request: {
            type: 'GET',
            description: 'Get all category',
            category: category
        }
    })
} catch (err) {
    console.log('err :', JSON.stringify(err, null, 4))
    res.status(400).json({
        error: 'Bad request',
        message: err.message
    })
}
}

exports.create = async (req, res, next) =>{
    try {
        // const admin = await Admin.findById(req.body.adminId)
        let params = req.body
        params._id = new mongoose.Types.ObjectId()
        let category = new CategoryCamp(params)
        category.save()
        res.status(201).json({
            request: {
                type: "POST",
                description: 'Create category',
                create: {
                    _id:category._id,
                    name:category.name
                }
            }
        })
    } catch (err) {
    console.log('err :', JSON.stringify(err, null, 4))
    res.status(400).json({
        error: 'Bad request',
        message: err.message
    })
}
}