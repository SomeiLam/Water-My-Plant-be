const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { checkValidateBodyforLogin, checkValidateBodyforRegister, checkUsernameFree, checkUsernameExists } = require('./auth-middleware')
const buildToken = require('./token-builder')
const Users = require('../users/users-model')

router.post('/register', checkValidateBodyforLogin, checkUsernameFree, (req, res, next) => {
    let user = req.body
    const rounds = process.env.BCRYPT_ROUNDS || 8
    const hash = bcrypt.hashSync(user.password, rounds)
    user.password = hash
    Users.add(user)
        .then(saved => {
            res.status(201).json(saved)
        })
        .catch(next)
});

router.post('/login', checkValidateBodyforRegister, checkUsernameExists, (req, res, next) => {
    if (bcrypt.compareSync(req.body.password, req.user.password)) {
        const token = buildToken(req.user)
        res.status(200).json({
            message: `welcome, ${req.user.username}`,
            token
        })
    } else {
        next({ status: 401, message: 'invalid credentials' })
    }
});

module.exports = router;
