const mongoose = require('mongoose')
const Camp = require('../camps/campModel')

exports.verefication = async (req, res, next) => {
    try {
        if (req.params.key === process.env.VEREFICATION_KEY) {
            Camp.findOneAndUpdate({
                _id: req.params.campId,
            }, {"status":"verificated"}, function (err, camp) {
                if (err) return res.send(500, {
                    error: err
                });
                return res.status(200).json({
                    request: {
                        message: 'Camp verificated',
                        type: 'PATCH',
                        status: "verificated"
                    }
                })
            });
        } else {
            res.status(401).json({
                message: 'You are not admin! Auth failed'
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