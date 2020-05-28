const mongoose = require('mongoose')

const Order = require('./model.js')
const Admin = require('../admin/model.js')
const Camp = require('../camps/model.js')
const User = require('../users/model.js')
const Owner = require('../owners/model.js')

// Telegraf
const Telegraf = require("telegraf");
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const {
    send
} = require('../../helpers/telegram')

exports.post = async (req, res, next) => {
    try {
        const user = await User.findById(req.body.userId)
        if (user) {
            let camp = await Camp.findById(req.body.camp)
            if (!camp) {
                return res.status(404).json({
                    message: 'Camp not found'
                })
            }
            let params = req.body
            params._id = new mongoose.Types.ObjectId()
            params.owner = camp.owner
            params.user = user.id
            const order = new Order(params)
            order.save()

            const keyboard = Markup.inlineKeyboard([
                Markup.urlButton('❤️ nodejs', 'http://fb.com'),
              ])

            send("CREATED_ORDER", {
                name: user.name,
                price:params.price,
                keyboard: keyboard,
                message:order
            })
            res.status(201).json({

                request: {
                    type: 'POST',
                    message: 'Order stored',
                    order: order
                }
            })

        } else {
            res.status(401).json({
                message: 'Auth failed'
            })
        }
    } catch (err) {
        console.log('err :', JSON.stringify(err, null, 4))
        res.status(400).json({
            error: 'Bad request',
            message: err.message
        })
    }
}

exports.get_all = async (req, res, next) => {
    try {
        const owner = await Owner.findById(req.body.ownerId)
        if (owner) {
            let order = await Order.find({
                owner: owner.id
            }).exec()
            return res.status(200).json({
                request: {
                    count: order.length,
                    type: 'GET',
                    message: 'Get all orders',
                    orders: order
                }
            })
        } else {
            res.status(401).json({
                message: 'Auth failed'
            })
        }
    } catch (err) {
        console.log('err :', JSON.stringify(err, null, 4))
        res.status(400).json({
            error: 'Bad request',
            message: err.message
        })
    }

}

exports.get = async (req, res, next) => {
    try {
        const admin = await Admin.findById(req.body.adminId)
        const user = await User.findById(req.body.userId)
        const id = req.params.orderId
        const order = await Order.findById(id)
        if (admin || user.id === String(order.user)) {
            Order.findById(id)
            if (order) {
                return res.status(200).json({
                    request: {
                        type: 'GET',
                        description: 'Get Order by Id',
                        order: order,
                    }
                })
            } else {
                res.status(401).json({
                    message: 'Auth failed'
                })
            }
        }
    } catch (err) {
        console.log('err :', JSON.stringify(err, null, 4))
        res.status(400).json({
            error: 'Bad request',
            message: err.message
        })
    }

}

exports.patch = async (req, res, next) => {
    try {
        const admin = await Admin.findById(req.body.adminId)
        const user = await User.findById(req.body.userId)
        const order = await Order.findById(req.params.orderId)
        if (admin || user.id === String(order.user)) {
            Order.updateOne({
                _id: req.params.orderId
            }, req.body.order, function (err, order) {
                if (err) return res.send(500, {
                    error: err
                });
                const keyboard = Markup.inlineKeyboard([
                    Markup.urlButton('❤️ nodejs', 'http://fb.com'),
                  ])
    
                send("PATCH_ORDER", {
                    name: order.user,
                    price:order.price,
                    keyboard: keyboard,
                    message:order
                })
                return res.status(200).json({
                    request: {
                        type: 'PATCH',
                        message: 'comment updated',
                        description: 'Patch comment by Id',
                        update: order
                    }
                })
            });
        } else {
            res.status(401).json({
                message: 'Auth failed'
            })
        }
    } catch (err) {
        console.log('err :', JSON.stringify(err, null, 4))
        res.status(400).json({
            error: 'Bad request',
            message: err.message
        })
    }
}

exports.delete = async (req, res, next) => {
    try {
        const admin = await Admin.findById(req.body.adminId)
        const user = await User.findById(req.body.userId)
        const order = await Order.findById(req.params.orderId)
        if (admin || user.id === String(order.user)) {
            Order.findByIdAndDelete({
                _id: req.params.orderId
            }, function (err) {
                if (err) console.log(err);
                send("DELETE_ORDER", {
                    name: req.params.orderId,
                    keyboard: keyboard,
                    message:order
                })
                return res.status(200).json({
                    request: {
                        type: 'DELETE',
                        message: 'Order deleted',
                        description: 'Delete Order by Id',
                    }
                })
            });
        } else {
            res.status(401).json({
                message: 'Auth failed'
            })
        }
    } catch (err) {
        console.log('err :', JSON.stringify(err, null, 4))
        res.status(400).json({
            error: 'Bad request',
            message: err.message
        })
    }
}