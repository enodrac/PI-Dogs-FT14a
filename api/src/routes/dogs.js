const router = require('express').Router();
const {Dog, Temperament} = require('../db');
const {Op} = require('sequelize');

router.get('/', (req, res) => {
    let {name, temps, orderby, what} = req.query;
    if (temps) {
        console.log(temps);
        Dog.findAll({include: {model: Temperament, where: {name: temps}, order: [['id', 'ASC']]}})
            .then((response) => res.send(response))
            .catch((err) => console.log('error api get 1'));
    } else if (name) {
        Dog.findAll({where: {name: {[Op.iLike]: '%' + name + '%'}}, order: [['id', 'ASC']], include: {model: Temperament}})
            .then((response) => res.send(response))
            .catch((err) => console.log('error api get 2'));
    } else {
        Dog.findAll({include: {model: Temperament}, order: [[what, orderby]]})
            .then((response) => res.send(response))
            .catch((err) => console.log('error api get 3'));
    }
});

router.get('/:breedId', (req, res) => {
    const {breedId} = req.params;
    if (breedId) {
        Dog.findOne({where: {id: breedId}, include: {model: Temperament}})
            .then((response) => res.send(response))
            .catch((err) => console.log('error api get 4'));
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

        if (temperaments) {
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

module.exports = router;
