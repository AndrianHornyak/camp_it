const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Admin = require('./adminModel')
exports.login = (req, res, next) => {
    try {
        Admin.findOne({
                email: req.body.email
            })
            .exec()
            .then(admin => {
                if (admin.length < 1) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    })
                }
                bcrypt.compare(req.body.password, admin.password, (err, result) => {
                    if (err) {
                        return res.status(401).json({
                            message: 'Auth failed'
                        })
                    }
                    if (result) {
                        const token = jwt.sign({
                                email: admin.email,
                                id: admin._id,
                                telegram: admin.telegram
                            },
                            process.env.JWT_KEY, {
                                expiresIn: '20m',
                            }
                        )
                        return res.status(200).json({
                            request: {
                                message: 'Auth successful',
                                token: token,
                                email: admin.email,
                                admin: admin._id,
                                telegram: admin.telegram
                            }
                        })
                    }
                    return res.status(401).json({
                        message: 'Auth failed'
                    })
                })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    error: err
                })
            })
    } catch (err) {
        console.log('err :', JSON.stringify(err, null, 4))
        res.status(400).json({
            error: 'Bad request',
            message: err.message
        })
    }
}