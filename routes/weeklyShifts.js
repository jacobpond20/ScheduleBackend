const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const shift = require('../models/shift');
const DayShift = require('../models/dayShift');
const Mongoose = require('mongoose');


router.post('/', async (req, res) => {
    let id = Mongoose.Types.ObjectId(req.body.weekID);
    let shifts = await DayShift.find({week: id});
    if(shifts.length == 0){
        res.json({message: "No employees have been scheduled for this week."});
        return;
    }
    res.json(shifts);
});

module.exports = router;