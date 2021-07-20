const router = require('express').Router();
const {Dog, Temperament} = require('../db');
const {Op} = require('sequelize');

router.get('/', (req, res, next) => {
    let {temps, orderby, what} = req.query;
    if (temps) {
        Dog.findAll({include: {model: Temperament, where: {name: temps}, order: [['id', 'ASC']]}})
            .then((response) => res.send(response))
            .catch((err) => next(err));
    } else {
        if (!orderby && !what) {
            orderby = 'ASC';
            what = 'name';
        }
        Dog.findAll({include: {model: Temperament}, order: [[what, orderby]]})
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

router.post('/', async (req, res) => {
    const {name, weight_min, weight_max, height, life_span, temperaments, img} = req.body;
    try {
        var newDog = await Dog.create({
            name: name,
            weight_min: weight_min,
            weight_max: weight_max,
            height: height,
            life_span: life_span,
            img: img,
            created: 'true',
        });

        if (temperaments.length) {
            temperaments.map(async (tem) => {
                try {
                    var temper = await Temperament.findOne({where: {name: tem}});
                    newDog.addTemperament(temper);
                } catch (err) {
                    console.log('error api post 1');
                }
            });
        }
        res.send(newDog);
    } catch (err) {
        console.log('error api post 2');
    }
});

//POST
//////////////////////////////////////////////////////////////////////////////////
//PUT

router.put('/:breedId', (req, res) => {});

//PUT
//////////////////////////////////////////////////////////////////////////////////
//DELETE

router.delete('/:breedId', (req, res) => {
    const {breedId} = req.params;
    try {
        Dog.destroy({where: {id: breedId}});
        res.sendStatus(200);
    } catch (err) {
        console.log('error api delete 1');
    }
});

module.exports = router;
