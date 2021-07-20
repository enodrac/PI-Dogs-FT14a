const router = require('express').Router();
const {User, Dog, Temperament} = require('../db');

router.get('/', (req, res) => {
    let {email, password} = req.query;
    User.findOne({where: {email: email, password: password}, include: {model: Dog}})
        .then((response) => res.send(response.dataValues.name))
        .catch((err) => console.log('error get user 1'));
});

router.get('/favorites', async (req, res) => {
    let {name} = req.query;
    try {
        let user = await User.findOne({where: {name: name}, include: {model: Dog, include: [Temperament]}, order: [['name', 'ASC']]});
        return res.send(user.Dogs);
    } catch (err) {
        console.log('error get favorites 1');
    }
    res.send([]);
});

//GET
//////////////////////////////////////////////////////////////////////////////////
//POST

router.post('/', (req, res) => {
    let {name, email, password} = req.body;
    User.create({
        name: name,
        email: email,
        password: password,
    })
        .then((response) => res.send(response))
        .catch((err) => console.log('error post user 1'));
});

router.post('/add', async (req, res) => {
    let {breedId, name} = req.body;
    try {
        let user = await User.findOne({where: {name: name}});
        let dog = await Dog.findOne({where: {id: breedId}});
        user.addDog(dog);
    } catch (err) {
        console.log('error add favorite');
    }
    res.send('a');
});

module.exports = router;
