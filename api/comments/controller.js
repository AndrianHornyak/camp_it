const mongoose = require('mongoose')

const Comment = require('../comments/model.js')
const Admin = require('../admin/model.js')
const Camp = require('../camps/model.js')
const User = require('../users/model.js')
const Owner = require('../owners/model.js')

exports.get_all = async (req, res, next) => {
    try {
        const admin = await Admin.findById(req.body.adminId)
        const user = await User.findById(req.body.userId)
        if (admin || user) {
            let comment = await Comment.find({
                user: user
            }).exec()
            res.status(200).json({
                request: {
                    count: comment.length,
                    type: 'GET',
                    message: 'Get all comments',
                    comments: comment
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
        const id = await Comment.findById(req.params.commentId)
        if (admin || user.id === String(id.user)) {
            let comment = await Comment.findById(req.params.commentId)
                .exec()
            if (comment) {
                res.status(200).json({
                    request: {
                        type: 'GET',
                        description: 'Get Comment by Id',
                        comment: comment,
                    }
                })
            }
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

exports.post = async (req, res, next) => {
    try {
        const admin = await Admin.findById(req.body.adminId)
        const user = await User.findById(req.body.userId)
        if (admin || user) {
            let camp = await Camp.findById(req.body.camp)
            if (!camp) {
                return res.status(404).json({
                    message: 'Camp not found'
                })
            }
            let params = req.body
            params._id = new mongoose.Types.ObjectId()
            params.owner = camp.owner
            params.user = user.id || admin.id
            const comment = new Comment(params)
            comment.save()
            return res.status(201).json({
                request: {
                    type: 'POST',
                    message: 'Comment stored',
                    comment: comment
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

exports.patch = async (req, res, next) => {
    try {
        const admin = await Admin.findById(req.body.adminId)
        const user = await User.findById(req.body.userId)
        const comment = await Comment.findById(req.params.commentId)
        if (admin || user.id === String(comment.user)) {
            Comment.updateOne({
                _id: req.params.commentId
            }, req.body.comment, function (err, comment) {
                if (err) return res.send(500, {
                    error: err
                });
                return res.status(200).json({
                    request: {
                        type: 'PATCH',
                        message: 'Comment updated',
                        description: 'Patch Comment by Id',
                        update: req.body.comment
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
        const comment = await Comment.findById(req.params.commentId)
        if (admin || user.id === String(comment.user)) {
            Comment.findByIdAndDelete({
                _id: req.params.commentId
            }, function (err) {
                if (err) console.log(err);
                console.log("Successful deletion");
                return res.status(200).json({
                    request: {
                        type: 'DELETE',
                        message: 'Comment deleted',
                        description: 'Delete Comment by Id',
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