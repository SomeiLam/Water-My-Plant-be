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

module.exports = router;
