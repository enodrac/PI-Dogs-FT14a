const router = require('express').Router();
const {User, Dog, Temperament} = require('../db');

router.get('/', (req, res, next) => {
    let {email, password} = req.query;
    User.findOne({where: {email: email, password: password}, include: {model: Dog}})
        .then((response) => res.send(response.dataValues.name))
        .catch((err) => next(err));
});

router.get('/favorites', async (req, res, next) => {
    let {name} = req.query;
    try {
        let user = await User.findOne({where: {name: name}, include: {model: Dog, include: [Temperament]}, order: [['name', 'ASC']]});
        return res.send(user.Dogs);
    } catch (err) {
        next(err);
    }
    res.send([]);
});

//GET
//////////////////////////////////////////////////////////////////////////////////
//POST

router.post('/', (req, res, next) => {
    let {name, email, password} = req.body;
    User.create({
        name: name,
        email: email,
        password: password,
    })
        .then((response) => res.send(response))
        .catch((err) => next(err));
});

router.post('/add', async (req, res, next) => {
    let {breedId, name} = req.body;
    try {
        let user = await User.findOne({where: {name: name}});
        let dog = await Dog.findOne({where: {id: breedId}});
        user.addDog(dog);
    } catch (err) {
        next(err);
    }
    res.send('a');
});

module.exports = router;
