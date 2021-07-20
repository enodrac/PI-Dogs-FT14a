const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const {default: axios} = require('axios');
const {Dog, Temperament} = require('./db');

require('./db.js');

const server = express();

server.name = 'API';

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
                var newDog = await Dog.create({
                    name: dog.name,
                    weight_min: min,
                    weight_max: max,
                    height: dog.height.metric,
                    life_span: dog.life_span,
                    img: dog.image.url,
                    created: 'false',
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

server.use(express.json());
// server.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
// server.use(bodyParser.json({limit: '50mb'}));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

server.use(express.urlencoded({extended: true}));

server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => {
    // eslint-disable-line no-unused-vars
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
});

module.exports = server;
