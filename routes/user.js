const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');


router.get('/:username', async (req, res) => {
    let user = await User.findOne({username: req.body.username});
    if(user == null){
        res.status(204);
    }else{
       res.status(200).json(user); 
    }
});

router.post('/create', async (req, res) => {
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