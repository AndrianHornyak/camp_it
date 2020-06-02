const mongoose = require('mongoose')

const Admin = require('../admin/model.js')
const Owner = require('../owners/model.js')
const Camp = require('./model.js')
const Comment = require('../comments/model.js')
const {
    isEmpty,
    omit
} = require('lodash')

const moment = require('moment')
// Telegraf
const Telegraf = require("telegraf");
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const {
    send
} = require('../../helpers/telegram')

//helpers
const { date_filter } = require('../../helpers/camps.js');


exports.needverification = async (req, res, next) => {
    try {
        const admin = await Admin.findById(req.body.adminId)
        if (admin) {
            let camp = await Camp.find({
                status: 'moderation'
            })
            res.status(200).json({
                request: {
                    type: 'GET',
                    description: 'Get all camps status "moderation"',
                    сount: camp.length,
                    camp: camp,
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

exports.verification = async (req, res, next) => {
    try {
        const admin = await Admin.findById(req.body.adminId)
        if (admin) {
            Camp.findOneAndUpdate({
                _id: req.params.campId,
            }, req.body.camp, function (err, camp) {
                if (err) return res.send(500, {
                    error: err
                });
                return res.status(200).json({
                    request: {
                        message: 'Camp verificated',
                        type: 'PATCH',
                        status: camp.status
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

exports.get_all = async (req, res, next) => {
    try {
        const camp = await Camp.find({
            status: 'verificated'
        })
        res.status(200).json({
            request: {
                type: 'GET',
                description: 'Get all camps status "verificated"',
                сount: camp.length,
                camps: camp.map(camp => {
                    return {
                        camp: {
                            date: camp.date,
                            _id: camp.id,
                            status: camp.status,
                            owner: camp.owner,
                            logo: camp.logo,
                            photo: camp.photo,
                            name: camp.name,
                            start_date: camp.start_date,
                            end_date: camp.end_date,
                            place: camp.place,
                            age_limit: camp.age_limit,
                            price: camp.price,
                            rate: camp.rate,
                            service_aprove: camp.service_aprove,
                            shilts: {
                                shilts_title: camp.shilts_title,
                                shilts_price: camp.shilts_price,

                            },
                            description: {
                                about: camp.about,
                                food: camp.food,
                                stay: camp.stay,
                                infrastructure: camp.infrastructure,
                                program: camp.program,
                                med_service: camp.med_service,
                                safety: camp.sefety,
                                transfer: camp.transfer,
                                message_admin_camp: camp.message_admin_camp,
                                motivation: camp.motivation,
                            },
                            director: camp.director
                        }
                    }
                })
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
exports.get_filter2 = async (req, res, next) => {
    try {

        req.query.status = "verificated";

        let params = await omit(req.query, ['start_date', 'end_date']);
        
        var camps = await Camp.find(params)
        var camps = await date_filter(
            camps, req.query.start_date ? req.query.start_date : null,
             req.query.end_date ? req.query.end_date : null, 
             res);
            
        if (!isEmpty(camps)) {
            res.status(200).json({
                request: {
                    type: 'GET',
                    description: 'Get all camps status "verificated"',
                    сount: camps.length,
                    camps: camps.map(camp => {
                        return {
                            camp: {
                                date: camp.date,
                                _id: camp.id,
                                status: camp.status,
                                owner: camp.owner,
                                logo: camp.logo,
                                photo: camp.photo,
                                name: camp.name,
                                start_date: camp.start_date,
                                end_date: camp.end_date,
                                place: camp.place,
                                age_limit: camp.age_limit,
                                price: camp.price,
                                rate: camp.rate,
                                service_aprove: camp.service_aprove,
                                shilts: {
                                    shilts_title: camp.shilts_title,
                                    shilts_price: camp.shilts_price,
    
                                },
                                description: {
                                    about: camp.about,
                                    food: camp.food,
                                    stay: camp.stay,
                                    infrastructure: camp.infrastructure,
                                    program: camp.program,
                                    med_service: camp.med_service,
                                    safety: camp.sefety,
                                    transfer: camp.transfer,
                                    message_admin_camp: camp.message_admin_camp,
                                    motivation: camp.motivation,
                                },
                                director: camp.director
                            }
                        }
                    })
                }
            })
        } else {
            res.status(404).json({
                message: 'Camps is not defined.'
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

exports.get_byDate = async (req, res, next) => {
    // Camp.find({
    //     occupation: /camps/,
    //     'name': 'req.body.name',
    //     age: { $gt: 17, $lt: 66 },
    //     likes: { $in: ['vaporizing', 'talking'] }
    //   }).
    //   limit(10).
    //   sort({ occupation: -1 }).
    //   select({ name: 1, occupation: 1 }).
    //   exec(callback);
    try {
        const camp = await Camp.find({
            status: "verificated",
            start_date: req.body.start_date,
            end_date: req.body.end_date
        })
        res.status(200).json({
            request: {
                type: 'GET',
                description: 'Get all camps status "verificated"',
                campcampLength: camp.length,
                camps: camp.map(camp => {
                    return {
                        camp: {
                            date: camp.date,
                            _id: camp.id,
                            status: camp.status,
                            owner: camp.owner,
                            logo: camp.logo,
                            photo: camp.photo,
                            name: camp.name,
                            start_date: camp.start_date,
                            end_date: camp.end_date,
                            place: camp.place,
                            age_limit: camp.age_limit,
                            price: camp.price,
                            rate: camp.rate,
                            service_aprove: camp.service_aprove,
                            shilts: {
                                shilts_title: camp.shilts_title,
                                shilts_price: camp.shilts_price,

                            },
                            description: {
                                about: camp.about,
                                food: camp.food,
                                stay: camp.stay,
                                infrastructure: camp.infrastructure,
                                program: camp.program,
                                med_service: camp.med_service,
                                safety: camp.sefety,
                                transfer: camp.transfer,
                                message_admin_camp: camp.message_admin_camp,
                                motivation: camp.motivation,
                            },
                            director: camp.director
                        }
                    }
                })
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

exports.get_filter = async (req, res, next) => {
    try {
        const getList = (model, query) => {
            const {
              limit = 25,
              offset = 0,
              filter = { sort: { column: "id", type: "desc" } }
            } = query;
            if (limit && offset) model.offset(offset).limit(limit);
            if (filter) {
              if (filter.sort) model.campBy(filter.sort.column, filter.sort.type);
              if (filter.where && !isArray(filter.where)) {
                model.where(
                  filter.where.column,
                  filter.where.operation,
                  filter.where.value
                );
              } else if (filter.where && isArray(filter.where)) {
                filter.where.map((curr, arr, i) =>
                  i === 1
                    ? model.where(curr.column, curr.operation, curr.value)
                    : model.andWhere(curr.column, curr.operation, curr.value)
                );
              }
            }
            return model;
          }
        getList = async ctx => {
            let camps = Camp.query({status:'verificated'},req.query);
            camps = service.getList(camps, ctx.request.body);
            camps = await camps
              .andWhere("ownerId", ctx.state.owner.id)
              .campBy("id", "desc");
            ctx.ok({ camps });
          };
        
        // if (req.query.start_date && isEmpty(req.query.end_date)) {
        //     let query = req.query
        //     let camps = await Camp.find({
        //         status: "verificated",
        //         start_date: {
        //             $gte: new Date(req.query.start_date),
        //             $lte: moment(moment().endOf('day')).toDate()
        //         }
        //     })
        //     console.log(
        //         camps, JSON.stringify(camps, null, 4)
        //     )
        // }

        res.status(200).json({
            request: {
                camps: camps
            }
            // request: {
            //     type: 'GET',
            //     description: 'Get all camps status "verificated"',
            //     сount: camps.length,
            //     camps: camps.map(camp => {
            //         return {
            //             camp: {
            //                 date: camp.date,
            //                 _id: camp.id,
            //                 status: camp.status,
            //                 owner: camp.owner,
            //                 logo: camp.logo,
            //                 photo: camp.photo,
            //                 name: camp.name,
            //                 start_date: camp.start_date,
            //                 end_date: camp.end_date,
            //                 place: camp.place,
            //                 age_limit: camp.age_limit,
            //                 price: camp.price,
            //                 rate: camp.rate,
            //                 service_aprove: camp.service_aprove,
            //                 shilts: {
            //                     shilts_title: camp.shilts_title,
            //                     shilts_price: camp.shilts_price,

            //                 },
            //                 description: {
            //                     about: camp.about,
            //                     food: camp.food,
            //                     stay: camp.stay,
            //                     infrastructure: camp.infrastructure,
            //                     program: camp.program,
            //                     med_service: camp.med_service,
            //                     safety: camp.sefety,
            //                     transfer: camp.transfer,
            //                     message_admin_camp: camp.message_admin_camp,
            //                     motivation: camp.motivation,
            //                 },
            //                 director: camp.director
            //             }
            //         }
            //     })
            // }
        })
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
        const owner = await Owner.findById(req.body.ownerId)

        let params = req.body;
        params._id = new mongoose.Types.ObjectId()
        params.status = 'moderation'
        params.owner = owner.id
        params.logo = req.file && req.file.path ? req.file.path : 'https://cdn2.vectorstock.com/i/1000x1000/02/06/khaki-tarpauline-camping-tent-vector-10090206.jpg'
        params.photo = req.file && req.file.path ? req.file.path : 'https://cdn2.vectorstock.com/i/1000x1000/02/06/khaki-tarpauline-camping-tent-vector-10090206.jpg'
        const camp = new Camp(params);
        camp.save()
        const keyboard = Markup.inlineKeyboard([
            Markup.urlButton('Верифицировать легерь', 'http://fb.com'),
        ])
        send("VEREFICATION_CAMP", {
            name: owner.name,
            camp: camp,
            keyboard: keyboard
        })
        res.status(201).json({
            request: {
                type: 'POST',
                message: 'Created Camp successfully',
                camp: {
                    date: camp.date,
                    _id: camp.id,
                    status: camp.status,
                    owner: camp.owner,
                    logo: camp.logo,
                    photo: camp.photo,
                    name: camp.name,
                    start_date: camp.start_date,
                    end_date: camp.end_date,
                    place: camp.place,
                    age_limit: camp.age_limit,
                    price: camp.price,
                    rate: camp.rate,
                    service_aprove: camp.service_aprove,
                    shilts: {
                        shilts_title: camp.shilts_title,
                        shilts_price: camp.shilts_price,

                    },
                    description: {
                        about: camp.about,
                        food: camp.food,
                        stay: camp.stay,
                        infrastructure: camp.infrastructure,
                        program: camp.program,
                        med_service: camp.med_service,
                        safety: camp.sefety,
                        transfer: camp.transfer,
                        message_admin_camp: camp.message_admin_camp,
                        motivation: camp.motivation,
                    },
                    director: camp.director

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

exports.get = async (req, res, next) => {
    try {
        let comment = await Comment.find({
            camp: req.params.campId
        }).exec()
        let camp = await Camp.find({
            _id: req.params.campId
        }).exec()
        return res.status(200).json({
            request: {
                type: 'GET',
                description: 'Get Camp by Id',
                camp: {
                    date: camp.date,
                    _id: camp.id,
                    status: camp.status,
                    owner: camp.owner,
                    logo: camp.logo,
                    photo: camp.photo,
                    name: camp.name,
                    start_date: camp.start_date,
                    end_date: camp.end_date,
                    place: camp.place,
                    age_limit: camp.age_limit,
                    price: camp.price,
                    rate: camp.rate,
                    service_aprove: camp.service_aprove,
                    shilts: {
                        shilts_title: camp.shilts_title,
                        shilts_price: camp.shilts_price,

                    },
                    description: {
                        about: camp.about,
                        food: camp.food,
                        stay: camp.stay,
                        infrastructure: camp.infrastructure,
                        program: camp.program,
                        med_service: camp.med_service,
                        safety: camp.sefety,
                        transfer: camp.transfer,
                        message_admin_camp: camp.message_admin_camp,
                        motivation: camp.motivation,
                    },
                    director: camp.director

                },
                comments: {
                    сount: comment.length,
                    comment: comment
                }
            }
        })
    } catch (err) {
        console.log('err :>> ', JSON.stringify(err, null, 4));
        res.status(400).json({
            error: 'Bad request',
            message: err.message
        })
    }
}

exports.patch = async (req, res, next) => {
    try {
        const admin = await Admin.findById(req.body.adminId)
        const owner = await Owner.findById(req.body.ownerId)
        const camp = await Camp.findById(req.params.campId)
        if (admin || owner.id === String(camp.owner)) {
            Camp.updateOne({
                _id: req.params.campId
            }, req.body.camp, function (err, camp) {
                if (err) return res.send(500, {
                    error: err
                });
                send("PATCH_CAMP", {
                    name: owner.name,
                    camp: req.body.camp
                })
                return res.status(200).json({
                    request: {
                        type: 'PATCH',
                        message: 'Camp updated',
                        description: 'Update Camp by Id',
                        update: req.body.camp
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
        const owner = await Owner.findById(req.body.ownerId)
        const camp = await Camp.findById(req.params.campId)
        if (admin || owner.id === String(camp.owner)) {
            Camp.findByIdAndDelete({
                _id: req.params.campId
            }, function (err) {
                if (err) console.log(err);
                return res.status(200).json({
                    request: {
                        type: 'DELETE',
                        message: 'Camp deleted',
                        description: 'Delete Camp by Id'
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