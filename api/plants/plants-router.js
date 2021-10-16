const router = require("express").Router();
const Plants = require("./plants-model.js");
const { restricted } = require('../auth/auth-middleware.js')
const { checkValidateBody } = require('./plants-middleware')

router.get("/", restricted, (req, res, next) => {
    Plants.getPlantsByUserId(req.decodedToken.subject)
        .then(plants => {
            res.status(200).json(plants)
        })
        .catch(next)
});

router.get('/:id', restricted, (req, res, next) => {
    Plants.getPlantById(req.decodedToken.subject, req.params.id)
        .then(plant => {
            if (!plant) {
                res.status(401).json(
                    { message: `plant_id ${req.params.id} is other user's plant. ` }
                )
            } else {
                res.status(200).json(plant)
            }
        })
        .catch(next)
})

router.post('/', restricted, checkValidateBody, (req, res, next) => {
    Plants.addPlant(req.body)
        .then(plant => {
            res.status(201).json(plant)
        })
        .catch(next)
})

router.put('/:id', restricted, checkValidateBody, (req, res, next) => {
    Plants.updatePlant(req.decodedToken.subject, req.params.id, req.body)
        .then(plant => {
            if (!plant) {
                res.status(401).json(
                    { message: `plant_id ${req.params.id} is other user's plant. ` }
                )
            } else {
                res.status(200).json(plant)
            }
        })
        .catch(next)
})

router.delete('/:id', restricted, (req, res, next) => {
    Plants.deletePlant(req.decodedToken.subject, req.params.id)
        .then(plants => {
            res.status(200).json(plants)
        })
        .catch(next)
})

module.exports = router;
