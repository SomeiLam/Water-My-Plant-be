const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { checkValidateBody, checkUsernameFree, checkUsernameExists } = require('./auth-middleware')
const buildToken = require('./token-builder')
const Users = require('../users/users-model')

router.post('/register', checkValidateBody, checkUsernameFree, (req, res, next) => {
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

router.post('/login', checkValidateBody, checkUsernameExists, (req, res, next) => {
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

router.delete('/:id', (req, res, next) => {
    Users.removeUser(req.params.id)
        .then(() => {
            res.status(200).json(`user_id ${req.params.id} has been removed`)
        })
        .catch(next)
})

module.exports = router;
