const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Person = require('../models/person');

router.get('/', async (req, res) => {
    let users = await User.find();
    res.render('../templates/createPerson', {
        "users": users
    });
});

router.post('/', async (req, res) => {
    let name = req.body.name;
    let hours = req.body.hours;
    let role = req.body.role;
    let user = req.body.user;
    let person = new Person({
        name: name,
        hours: hours,
        role: role,
        user_id: user
    });
    person.save();
    res.render('../templates/loginHome', {});
});

module.exports = router;