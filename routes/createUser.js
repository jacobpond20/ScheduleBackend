const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');


router.get('/', (req, res) => {
    res.status(204).send();
});

router.post('/', async (req, res) => {
    let x = await User.findOne({username: req.body.username});
    if(x == null){
        const user = new User({
        username: req.body.username,
        password: await bcrypt.hash(req.body.password, await bcrypt.genSalt())
        });
        user.save();
        res.status(201).json(user);
    }else {
        res.status(409).send("That user already exists");
    }
});

module.exports = router;