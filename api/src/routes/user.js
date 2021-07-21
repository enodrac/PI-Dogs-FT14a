const router = require('express').Router();
const {User, Dog, Temperament} = require('../db');

router.get('/', (req, res, next) => {
    let {email, password} = req.query;
    User.findOne({where: {email: email, password: password}, include: {model: Dog}})
        .then((response) => res.send(response))
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
});

//GET
//////////////////////////////////////////////////////////////////////////////////
//POST

router.post('/', async (req, res, next) => {
    let {name, email, password} = req.body;
    try {
        let [user, created] = await User.findOrCreate({where: {name: name}, defaults: {email: email, password: password}});
        if (!created) return res.send(user);
        return res.send({});
    } catch (err) {
        next(err);
    }
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
});

module.exports = router;
