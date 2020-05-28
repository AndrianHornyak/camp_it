const express = require('express')
const router = express.Router()
const multer = require('multer')
const CheckAuth = require('../../middleware/check-auth.js')

const storage = multer.diskStorage({
    destination: function(req, file , cb){
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage ,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})

const CampController = require('./campController')
const BASE_URL = "/camp";
const BASE_URL_1 = "/camps"


router.patch(`${BASE_URL}/verification/:campId`, CheckAuth, CampController.verification)
.post(`${BASE_URL}`,upload.single('photo'), CheckAuth,  CampController.post)
.get(`${BASE_URL}/:campId`, CampController.get)
.patch(`${BASE_URL}/:campId`, CheckAuth,  CampController.patch)
.delete(`${BASE_URL}/:campId`, CheckAuth,  CampController.delete)
.get(`${BASE_URL_1}/needverification`, CheckAuth, CampController.needverification)
.get(`${BASE_URL_1}`, CampController.get_all)
.get(`${BASE_URL_1}/date `, CampController.get_byDate)
.get(`${BASE_URL_1}/filter`, CampController.get_filter)

module.exports = router