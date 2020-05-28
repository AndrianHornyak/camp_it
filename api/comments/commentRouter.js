const express = require('express')
const router = express.Router()
const CheckAuth = require('../../middleware/check-auth.js')

const commentController = require('./commentController')

router.get('/comments',CheckAuth, commentController.get_all)
.post('/camp/comment/',CheckAuth, commentController.post)
.get('/camp/comment/:commentId',CheckAuth, commentController.get )
.patch('/camp/comment/:commentId',CheckAuth, commentController.patch )
.delete('/camp/comment/:commentId',CheckAuth, commentController.delete )

module.exports = router