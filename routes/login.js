const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const Person = require('../models/person');

const router = express.Router();

router.get('/', (req,res) => {
    res.status(204).send();
});

router.post('/', async (req, res) => {
    var user = await User.findOne({username: req.body.username});
    if(user == null){
        return res.status(404).send('Cannot find user')
    }
    let person = await Person.findOne({user: user})
    try {
        if (await bcrypt.compare(req.body.password, user.password)){
            return res.sendStatus(200);
        } else {
            return res.status(404).send('Incorrect username or password');
        }
    } catch {
        res.status(500).send('Error while bcrypt comparing passwords')
    }
});

module.exports = router;