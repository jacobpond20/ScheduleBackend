const express = require('express');
const pug = require('pug');
const router = express.Router();
const User = require('../models/user');

//Create home() pug function
var createUser = pug.compileFile('./templates/createUser.pug');

router.get('/', (req, res) => {
    res.send(createUser());
});

router.post('/', (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    user.save();
    res.send("Successful");
});

module.exports = router;