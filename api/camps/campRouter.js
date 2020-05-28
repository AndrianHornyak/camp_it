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

router.get('/camps/needverification', CheckAuth, CampController.needverification)
.patch('/camp/verification/:campId', CheckAuth, CampController.verification)
.get('/camps', CampController.get_all)
.get('/camps/date', CampController.get_byDate)
.get('/camps/filter', CampController.get_filter)
.post('/camp',upload.single('photo'), CheckAuth,  CampController.post)
.get('/camp/:campId', CampController.get)
.patch('/camp/:campId', CheckAuth,  CampController.patch)
.delete('/camp/:campId', CheckAuth,  CampController.delete)

module.exports = router