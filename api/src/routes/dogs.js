const router = require('express').Router();
const {Dog, Temperament} = require('../db');
const {Op} = require('sequelize');

router.get('/', (req, res, next) => {
    let {temps, how, what} = req.query;
    if (temps) {
        Dog.findAll({include: {model: Temperament, where: {name: temps}, order: [['id', 'ASC']]}})
            .then((response) => res.send(response))
            .catch((err) => next(err));
    } else {
        if (!how && !what) {
            how = 'ASC';
            what = 'name';
        }
        Dog.findAll({include: {model: Temperament}, order: [[what, how]]})
            .then((response) => res.send(response))
            .catch((err) => next(err));
    }
});

router.get('/:breedId', (req, res, next) => {
    const {breedId} = req.params;
    if (breedId) {
        Dog.findOne({where: {id: breedId}, include: {model: Temperament}})
            .then((response) => res.send(response))
            .catch((err) => next(err));
    }
});

//GET
//////////////////////////////////////////////////////////////////////////////////
//POST

router.post('/', async (req, res, next) => {
    const {name, weight_min, weight_max, height, life_span, temperaments, img} = req.body;
    try {
        let [newDog, find] = await Dog.findOrCreate({
            where: {name: name},
            defaults: {
                weight_min: weight_min,
                weight_max: weight_max,
                height: height,
                life_span: life_span,
                img: img,
                created: 'true',
            },
        });

        if (!find) return res.send(newDog);

        if (temperaments.length) {
            temperaments.map(async (tem) => {
                try {
                    let temper = await Temperament.findOne({where: {name: tem}});
                    newDog.addTemperament(temper);
                } catch (err) {
                    next(err);
                }
            });
        }
        res.send({});
    } catch (err) {
        next(err);
    }
});

//POST
//////////////////////////////////////////////////////////////////////////////////
//PUT

router.put('/:breedId', (req, res) => {});

//PUT
//////////////////////////////////////////////////////////////////////////////////
//DELETE

router.delete('/:breedId', (req, res, next) => {
    const {breedId} = req.params;
    try {
        Dog.destroy({where: {id: breedId}});
        res.sendStatus(200);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
