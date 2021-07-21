const router = require('express').Router();
const {Temperament} = require('../db');

router.get('/', async (req, res, next) => {
    Temperament.findAll({order: [['name', 'ASC']]})
        .then((response) => res.send(response))

        .catch((err) => next(err));
});

//GET
//////////////////////////////////////////////////////////////////////////////////
//POST

// router.post('/', async (req, res,) => {
//     return res.send('post temperament');
// });

module.exports = router;
