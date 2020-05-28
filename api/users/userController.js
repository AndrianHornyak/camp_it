const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('./userModel')
const Admin = require('../admin/adminModel')

exports.signup = (req, res, next) => {
    try {
        User.find({
                email: req.body.email
            })
            .then(user => {
                if (user.length >= 1) {
                    res.status(409).json({
                        message: 'Mail exists'
                    })
                } else {
                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        if (err) {
                            res.status(500).json({
                                error: err.message
                            })
                        } else {
                            let params = req.body
                            params._id = new mongoose.Types.ObjectId()
                            params.password = hash
                            const user = new User()
                            const token = jwt.sign({
                                    email: user.email,
                                    user: user._id
                                },
                                process.env.JWT_KEY, {
                                    expiresIn: '20m',
                                }
                            )
                            user.save()
                            res.status(201).json({
                                request: {
                                    type: "POST",
                                    message: 'User created',
                                    status: 'success',
                                    user: {
                                        id: user.id,
                                        email: user.email,
                                        name: user.name,
                                        phone: user.phone,
                                        city: user.city,
                                        childrens: {
                                            kid_name:user.kid_name,
                                            kid_age: user.kid_age
                                        }
                                    },
                                    token: token,
                                }
                            })
                        }
                    })
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    error: err.message
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

exports.login = (req, res, next) => {
    try {
        User.findOne({
                email: req.body.email
            })
            .exec()
            .then(user => {
                if (user.length < 1) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    })
                }
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (err) {
                        return res.status(401).json({
                            message: 'Auth failed'
                        })
                    }
                    if (result) {
                        const token = jwt.sign({
                                email: user.email,
                                id: user._id
                            },
                            process.env.JWT_KEY, {
                                expiresIn: '20m',
                            }
                        )
                        return res.status(200).json({
                            request: {
                                type: 'POST',
                                description: 'Login User',
                                message: 'Auth successful',
                                user: {
                                    id: user.id,
                                    email: user.email,
                                    name: user.name,
                                    phone: user.phone,
                                    city: user.city,
                                    childrens: {
                                        kid_name:user.kid_name,
                                        kid_age:user.kid_age
                                    }
                                },
                                token: token
                            }
                        })
                    }
                    return res.status(401).json({
                        message: 'Auth failed'
                    })
                })
            })
            .catch(err => {
                res.status(401).json({
                    message: 'Auth failed'
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

exports.get = async (req, res, next) => {
    try {
        const id = req.params.userId
        let user = await User.findById({
            _id: id
        }).exec()
        return res.status(200).json({
            request: {
                type: 'GET',
                description: 'Get User by Id',
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    phone: user.phone,
                    city: user.city,
                    childrens: {
                        kid_name: user.kid_name,
                        kid_age: user.kid_age
                    }
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

exports.patch = async (req, res, next) => {
    try {
        const user = await User.findById(req.body.userId)
        if (user.id === String(req.params.userId)) {
            User.updateOne({
                _id: req.params.userId
            }, req.body.user, function (err, user) {
                if (err) return res.send(500, {
                    error: err
                });
                return res.status(200).json({
                    request: {
                        type: 'PATCH',
                        message: 'User updated',
                        description: 'Patch User by Id',
                        update: req.body.user
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
        if (admin || user.id === String(req.params.userId)) {
            User.findByIdAndDelete({
                _id: req.params.userId
            }, function (err) {
                if (err) console.log(err);
                return res.status(200).json({
                    request: {
                        type: 'DELETE',
                        message: 'User deleted',
                        description: 'Delete User by Id'
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