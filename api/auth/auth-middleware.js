const { findBy } = require('../users/users-model.js')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../secrets')

const restricted = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
        return next({ status: 401, message: 'token required' })
    }
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
        if (err) {
            return next({ status: 401, message: 'token invalid' })
        }
        req.decodedToken = decodedToken
        return next()
    })
}

const checkValidateBody = (req, res, next) => {
    if (req.body.username === undefined || req.body.password === undefined) {
        next({ status: 422, message: 'username and password required' })
    } else {
        next()
    }
}

const checkUsernameFree = async (req, res, next) => {
    try {
        const [user] = await findBy({ username: req.body.username })
        if (user) {
            next({ status: 422, message: 'username taken' })
        } else {
            req.user = user
            next()
        }
    } catch (err) {
        next(err)
    }
}

const checkUsernameExists = async (req, res, next) => {
    try {
        const [user] = await findBy({ username: req.body.username })
        if (!user) {
            next({ status: 401, message: 'Invalid credentials' })
        } else {
            req.user = user
            next()
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    restricted,
    checkValidateBody,
    checkUsernameFree,
    checkUsernameExists,
}