const express = require('express');
const pug = require('pug');
const router = express.Router();
const User = require('../models/user');

//Create home() pug function
var createUser = pug.compileFile('./templates/createUser.pug');

router.get('/', (req, res) => {
    res.send(createUser());
});

router.post('/', async (req, res) => {
    let x = await User.find({username: req.body.username});
    console.log(x);
    if(x.length == 0){
        const user = new User({
        username: req.body.username,
        password: req.body.password
        });
        user.save();
        res.send("Successful");
    }else {
        res.render("../templates/createUser", {message: "User with that username already exists"});
    }
});

module.exports = router;