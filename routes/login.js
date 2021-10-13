const express = require('express');
const pug = require('pug');
const User = require('../models/user');

const router = express.Router();

var login = pug.compileFile('./templates/login.pug');
var home = pug.compileFile('./templates/home.pug');

router.get('/', (req,res) => {
    res.send(login());
});

router.post('/', (req, res) => {
    var user = req.body.username;
    var pass = req.body.password;
    if(User.findOne({username: user, password: pass}) != null){
        res.send("You have been logged in");
    }else{
        res.send(login());
    }
});

module.exports = router;