const {Router} = require('express');
const dogs = require('./dogs.js');
const temperament = require('./temperament.js');

const router = Router();

router.use('/dogs', dogs);
router.use('/temperament', temperament);

module.exports = router;
