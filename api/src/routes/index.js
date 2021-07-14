const {Router} = require('express');
const dogs = require('./dogs');
const temperament = require('./temperament');
const user = require('./user');

const router = Router();

router.use('/user', user);
router.use('/dogs', dogs);
router.use('/temperament', temperament);

module.exports = router;
