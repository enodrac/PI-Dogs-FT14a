const router = require('express').Router();
const {User, Dog} = require('../db');

router.get('/', (req, res) => {
    let {email, password} = req.query;
    console.log('GET USER', email, password);
    User.findOne({where: {email: email, password: password}, include: {model: Dog}})
        .then((response) => res.cookie('userId', 2))
        .catch((err) => console.log('error user get 1'));

    // if ((email, password)) {
    //     let user = users.filter((user) => user.email == email && user.password == password).pop();
    //     if (user) {
    //         res.cookie('userId', user.id);
    //         return res.redirect('/home');
    //     }
    // }
});

router.post('/', (req, res) => {
    let {name, email, password} = req.body;
    User.create({
        name: name,
        email: email,
        password: password,
    });
});

module.exports = router;
