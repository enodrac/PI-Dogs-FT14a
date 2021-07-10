const router = require('express').Router();
const {Dog, Temperament} = require('../db');
const {Op} = require('sequelize');

router.get('/', (req, res) => {
    let {name, temperament, orderby, what} = req.query;
    if (temperament) {
        Dog.findAll({include: {model: Temperament, where: {name: temperament}, order: [['id', 'ASC']], through: {attributes: []}}})
            .then((response) => res.send(response))
            .catch((err) => console.log('error api get 3'));
    } else if (name) {
        Dog.findAll({where: {name: {[Op.iLike]: '%' + name + '%'}}, order: [['id', 'ASC']], include: {model: Temperament}})
            .then((response) => res.send(response))
            .catch((err) => console.log('error api get 1'));
    } else {
        if (orderby === 'undefined') orderby = 'ASC';
        if (what === 'undefined') what = 'name';
        Dog.findAll({include: {model: Temperament}, order: [[what, orderby]]})
            .then((response) => res.send(response))
            .catch((err) => console.log('error api get 2'));
    }
});

router.get('/:breedId', (req, res) => {
    console.log('CCCCCCCCCCCC');
    const {breedId} = req.params;
    if (breedId) {
        Dog.findOne({where: {id: breedId}, include: {model: Temperament}})
            .then((response) => res.send(response))
            .catch((err) => console.log('error api get 3'));
    }
});

//GET
//////////////////////////////////////////////////////////////////////////////////
//POST

router.post('/', async (req, res) => {
    const {name, weight, height, life_span, temperaments} = req.body;
    try {
        var newDog = await Dog.create({
            name: name,
            weight: weight,
            height: height,
            life_span: life_span,
            img: '',
            created: 'true',
        });

        if (temperaments) {
            temperaments.map(async (tem) => {
                try {
                    var temper = await Temperament.findOne({where: {name: tem}});
                    newDog.addTemperament(temper);
                } catch (err) {
                    console.log('error 2');
                }
            });
        }
        res.send(newDog);
    } catch (err) {
        console.log('error 1');
    }
});

module.exports = router;
