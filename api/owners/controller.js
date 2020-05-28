const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Owner = require('./model.js')
const Admin = require('../admin/model.js')

exports.signup = (req, res, next) => {
    try {
        Owner.find({
                email: req.body.email
            })
            .then(owner => {
                if (owner.length >= 1) {
                    res.status(409).json({
                        message: 'Mail exists'
                    })
                } else {
                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        if (err) {
                            res.status(500).json({
                                error: err
                            })
                        } else {
                            let params = req.body
                            params._id = new mongoose.Types.ObjectId()
                            params.password = hash
                            const owner = new Owner(params)
                            const token = jwt.sign({
                                    email: owner.email,
                                    id: owner._id
                                },
                                process.env.JWT_KEY, {
                                    expiresIn: '20m',
                                }
                            )
                            owner.save()
                            res.status(201).json({
                                request: {
                                    message: 'Owner created',
                                    status: 'success',
                                    owner: {
                                        email: owner.email,
                                        name: owner.name,
                                        phone: owner.phone,
                                        telegram: owner.telegram,
                                        city: owner.city,
                                        site: owner.site
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

exports.login = (req, res, next) => {
    try {
        Owner.findOne({
                email: req.body.email
            })
            .exec()
            .then(owner => {
                if (owner.length < 1) {
                    return res.status(401).json({
                        error: err.message,
                        message: 'Auth failed'
                    })
                }
                bcrypt.compare(req.body.password, owner.password, (err, result) => {
                    if (err) {
                        return res.status(401).json({
                            message: 'Auth failed'
                        })
                    }
                    console.log('owner.email :', owner.email)
                    if (result) {
                        const token = jwt.sign({
                                email: owner.email,
                                id: owner._id
                            },
                            process.env.JWT_KEY, {
                                expiresIn: '20m',
                            }
                        )
                        return res.status(200).json({
                            request: {
                                type: 'POST',
                                description: 'Login Owner',
                                message: 'Auth successful',
                                owner: {
                                    id: owner.id,
                                    email: owner.email,
                                    name: owner.name,
                                    phone: owner.phone,
                                    telegram: owner.telegram,
                                    city: owner.city,
                                    site: owner.site
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
        const id = req.params.ownerId
        let owner = await Owner.findById({
            _id: id
        }).exec()
        return res.status(200).json({
            request: {
                type: 'GET',
                description: 'Get Owner by Id',
                owner: {
                    id: owner.id,
                    email: owner.email,
                    name: owner.name,
                    phone: owner.phone,
                    telegram: owner.telegram,
                    city: owner.city,
                    site: owner.site
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
        const owner = await Owner.findById(req.body.ownerId)
        if (owner.id === String(req.params.ownerId)) {
            Owner.updateOne({
                _id: req.params.ownerId
            }, req.body.owner, function (err, owner) {
                if (err) return res.send(500, {
                    error: err
                });
                return res.status(200).json({
                    request: {
                        type: 'PATCH',
                        message: 'Owner updated',
                        description: 'Patch Owner by Id',
                        update: req.body.owner
                    }
                })
            });
        } else {
            res.status(401).json({
                error: err.message,
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
        const owner = await Owner.findById(req.body.ownerId)
        if (admin || owner.id === String(req.params.ownerId)) {
            Owner.findByIdAndDelete({
                _id: req.params.ownerId
            }, function (err) {
                if (err) console.log(err);
                return res.status(200).json({
                    request: {
                        type: 'DELETE',
                        message: 'Owner deleted',
                        description: 'Delete Owner by Id'
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
