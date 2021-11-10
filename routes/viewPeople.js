const express = require('express');
const User = require('../models/user');
const Person = require('../models/person');

const router = express.Router();


router.get('/', async (req,res) => {
    let ppl = await Person.find();
    res.json(ppl);
});

router.post('/', async (req, res) => {
    res.status(200).send();
});

module.exports = router;