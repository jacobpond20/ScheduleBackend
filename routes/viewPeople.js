const express = require('express');
const User = require('../models/user');
const Person = require('../models/person');
const availability = require('../models/availability');

const router = express.Router();


router.get('/', async (req,res) => {
    let ppl = await Person.find();
    if(ppl.length == 0){
        res.status(202).json({message: "No people found"})
    }
    res.status(200).json(ppl);
});

router.get('/:username', async (req, res) => {
    let params = req.params;
    let user = await User.findOne({username: params.username});
    if(user == null){
        res.sendStatus(204);
    }else {
        let person = await Person.findOne({user_id: user._id});
        if(person == null){
            res.sendStatus(204);
        }else{
            res.status(200).json(person);            
        }
    }
});

module.exports = router;