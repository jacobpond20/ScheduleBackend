const express = require('express');
var mongoose = require('mongoose');
const Availability = require('../models/availability');
const person = require('../models/person');
const user = require('../models/user');
const Shift = require('../models/shift');

const router = express.Router();

router.post('/edit', async (req,res) => {
    let id = mongoose.Types.ObjectId(req.body.availID);
    let mon = [];
    let tue = [];
    let wed = [];
    let thu = [];
    let fri = [];
    let sat= [];
    let sun = [];

    for (s of await Shift.find({mon: true})){
        if(req.body.avail.mon_start <= s.start && req.body.avail.mon_end >= s.end){
            mon.push(s);
        };
    };
    for (s of await Shift.find({tue: true})){
        if(req.body.avail.tue_start <= s.start && req.body.avail.tue_end >= s.end){
            tue.push(s);
        };
    };
    for (s of await Shift.find({wed: true})){
        if(req.body.avail.wed_start <= s.start && req.body.avail.wed_end >= s.end){
            wed.push(s);
        };
    };
    for (s of await Shift.find({thu: true})){
        if(req.body.avail.thu_start <= s.start && req.body.avail.thu_end >= s.end){
            thu.push(s);
        };
    };
    for (s of await Shift.find({fri: true})){
        if(req.body.avail.fri_start <= s.start && req.body.avail.fri_end >= s.end){
            fri.push(s);
        };
    };
    for (s of await Shift.find({sat: true})){
        if(req.body.avail.sat_start <= s.start && req.body.avail.sat_end >= s.end){
            sat.push(s);
        };
    };
    for (s of await Shift.find({sun: true})){
        if(req.body.avail.sun_start <= s.start && req.body.avail.sun_end >= s.end){
            sun.push(s);
        };
    };

    let avail = await Availability.findOne({_id: id});
    avail.mon_start = req.body.avail.mon_start;
    avail.mon_end = req.body.avail.mon_end;
    avail.mon = mon;
    avail.tue_start = req.body.avail.tue_start;
    avail.tue_end = req.body.avail.tue_end;
    avail.tue = tue;
    avail.wed_start = req.body.avail.wed_start;
    avail.wed_end = req.body.avail.wed_end;
    avail.wed = wed;
    avail.thu_start = req.body.avail.thu_start;
    avail.thu_end = req.body.avail.thu_end;
    avail.thu = thu;
    avail.fri_start = req.body.avail.fri_start;
    avail.fri_end = req.body.avail.fri_end;
    avail.fri = fri;
    avail.sat_start = req.body.avail.sat_start;
    avail.sat_end = req.body.avail.sat_end;
    avail.sat = sat;
    avail.sun_start = req.body.avail.sun_start;
    avail.sun_end = req.body.avail.sun_end;
    avail.sun = sun;
    await avail.save();

    res.status(200).json(avail);
});

router.post('/fetch', async (req,res) => {
    let id = mongoose.Types.ObjectId(req.body.avail);   
    try{
        let avail = await Availability.findById(id);
        res.status(200).json({avail: avail});
    }catch(error){
        res.json(error.message);
    }
});
module.exports = router;