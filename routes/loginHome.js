const express = require('express');
const pug = require('pug');
const User = require('../models/user');
const Person = require('../models/person');

const router = express.Router();

var login = pug.compileFile('./templates/login.pug');
var home = pug.compileFile('./templates/home.pug');
var loginHome = pug.compileFile('./templates/loginHome.pug');

router.get('/', (req,res) => {
    res.status(200).send();
});

router.post('/', async (req, res) => {
    res.status(200).send();
});

module.exports = router;