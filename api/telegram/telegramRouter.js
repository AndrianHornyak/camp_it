const express = require('express')
const router = express.Router()

const TelegramController = require('./telegramController')
const BASE_URL = "/telegram/camp";

router.get(`${BASE_URL}/:campId/verefication/:key`, TelegramController.verefication)

module.exports = router