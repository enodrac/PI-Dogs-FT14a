const router = require('express').Router();
const {default: axios} = require('axios');
const {Dog, Temperament} = require('../db');

router.get('/', async (req, res, next) => {
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

        async function fillUp() {
            try {
                const response = await axios.get('https://api.thedogapi.com/v1/breeds/');
                response.data.map((dog) => {
                    if (dog.temperament) {
                        let temp = dog.temperament.replace(/\s/g, '').split(',');
                        temp.map(async (tem) => {
                            await Temperament.findOrCreate({
                                where: {name: tem},
                                defaults: {
                                    name: tem,
                                },
                            });
                        });
                    }
                });

                response.data.map(async (dog) => {
                    try {
                        let aux = dog.weight.metric.replace(/\s/g, '').split('-');
                        let min = parseInt(aux[0]);
                        let max = parseInt(aux[1]);
                        if (isNaN(min)) {
                            min = parseInt(max) - 1;
                            if (isNaN(max)) {
                                min = 1;
                                max = 2;
                            }
                        }
                        if (isNaN(max)) {
                            max = parseInt(min) + 1;
                        }
                        var [newDog, _created] = await Dog.findOrCreate({
                            where: {name: dog.name},
                            defaults: {
                                weight_min: min,
                                weight_max: max,
                                height: dog.height.metric,
                                life_span: dog.life_span,
                                img: dog.image.url,
                                created: 'false',
                            },
                        });
                    } catch (err) {
                        console.log('error api app 1');
                    }
                    if (dog.temperament) {
                        var temp = dog.temperament.replace(/\s/g, '').split(',');
                        temp.map(async (tem) => {
                            try {
                                var temper = await Temperament.findOne({where: {name: tem}});
                                newDog.addTemperament(temper);
                            } catch (err) {
                                console.log('error api app 2');
                            }
                        });
                    }
                });
            } catch (err) {
                console.log('error api app 3');
            }
        }

        fillUp();

        setTimeout(() => {
            Dog.findAll({include: {model: Temperament}, order: [[what, how]]})
                .then((response) => res.send(response))
                .catch((err) => next(err));
        }, 1000);
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
