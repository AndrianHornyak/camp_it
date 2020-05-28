const express = require('express')
const router = express.Router()
const CheckAuth = require('../../middleware/check-auth.js')

const commentController = require('./controller.js')

const BASE_URL = "/camp/comment";
const BASE_URL_1 = "/comments";

router.get(`${BASE_URL_1}`,CheckAuth, commentController.get_all)
.post(`${BASE_URL}/`,CheckAuth, commentController.post)
.get(`${BASE_URL}/:commentId`,CheckAuth, commentController.get )
.patch(`${BASE_URL}/:commentId`,CheckAuth, commentController.patch )
.delete(`${BASE_URL}/:commentId`,CheckAuth, commentController.delete )

module.exports = router