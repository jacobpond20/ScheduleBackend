const express = require('express');
const pug = require('pug');
const User = require('../models/user');

const router = express.Router();

var login = pug.compileFile('./templates/login.pug');
var home = pug.compileFile('./templates/home.pug');

router.get('/', (req,res) => {
    res.render('../templates/login', {});
});

router.post('/', async (req, res) => {
    var user = req.body.username;
    var pass = req.body.password;
    var x = await User.findOne({username: user, password: pass});
    if(x != null){
        res.render('../templates/loginHome', {});                                                     //Login user
    }else{
        res.render('../templates/login', {});
    }
});

module.exports = router;