const router = require("express").Router();
const bcrypt = require('bcryptjs')
const Users = require("./users-model.js");
const { restricted } = require('../auth/auth-middleware.js')

router.get("/", restricted, (req, res, next) => {
    Users.getUsers()
        .then(users => {
            res.json(users);
        })
        .catch(next);
});

router.delete('/:id', restricted, (req, res, next) => {
    Users.removeUser(req.params.id)
        .then(() => {
            res.status(200).json(`user_id ${req.params.id} has been removed`)
        })
        .catch(next)
})

router.put('/', restricted, (req, res, next) => {
    let user = req.body
    const rounds = process.env.BCRYPT_ROUNDS || 8
    const hash = bcrypt.hashSync(user.password, rounds)
    user.password = hash
    Users.update(req.decodedToken.subject, user)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(next)
})

module.exports = router;
