const jwt = require('jsonwebtoken')
const { User } = require('../models/User')
const { Shipment } = require('../models/Shipment')

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/login')
            } else {
                console.log(decodedToken);
                next()
            }
        })

    } else {
        res.redirect('/login')
    }
}

const checkUser = async (req, res, next) => {
    const token = req.cookies.jwt

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                // console.log(err.message);
                res.locals.user = user
                next()
            } else {
                // console.log('decodedToken', decodedToken);
                const users = await User.find().populate('shipments')
                const shipments = await Shipment.find().populate('customer')
                const user = await User.findById(decodedToken.id).populate('shipments')
                // console.log(user);
                res.locals.user = user
                res.locals.users = users.filter((value) => {
                    return value.role !== "admin"
                })
                console.log(res.locals.users);
                console.log("SHIPMENTS ===>", shipments);
                res.locals.shipments = shipments
                next()
            }
        })

    } else {
        res.locals.user = null
        next()
    }
}

module.exports = { requireAuth, checkUser }