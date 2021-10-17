const router = require("express").Router();
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

module.exports = router;
