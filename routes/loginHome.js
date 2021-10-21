const express = require('express');
const pug = require('pug');
const User = require('../models/user');
const Person = require('../models/person');

const router = express.Router();

var login = pug.compileFile('./templates/login.pug');
var home = pug.compileFile('./templates/home.pug');
var loginHome = pug.compileFile('./templates/loginHome.pug');

router.get('/', (req,res) => {
    res.render('../templates/loginHome', {});
});

router.post('/', async (req, res) => {
    if(req.body.createPerson == "createPerson"){
        res.send("Working");
    };
});

module.exports = router;