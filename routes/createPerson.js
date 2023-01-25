const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Person = require('../models/person');
const Avail = require('../models/availability');
const Shift = require('../models/shift');

router.get('/', async (req, res) => {
    let users = await User.find();
    res.json(users);
});

router.post('/', async (req, res) => {
    let mon = [];
    let tue = [];
    let wed = [];
    let thu = [];
    let fri = [];
    let sat = [];
    let sun = [];
    for (s of await Shift.find({mon: true})){
        if(req.body.mon_start <= s.start && req.body.form.mon_end >= s.end){
            mon.push(s);
        };
    };
    for (s of await Shift.find({tue: true})){
        if(req.body.tue_start <= s.start && req.body.form.tue_end >= s.end){
            tue.push(s);
        };
    };
    for (s of await Shift.find({wed: true})){
        if(req.body.wed_start <= s.start && req.body.form.wed_end >= s.end){
            wed.push(s);
        };
    };
    for (s of await Shift.find({thu: true})){
        if(req.body.thu_start <= s.start && req.body.form.thu_end >= s.end){
            thu.push(s);
        };
    };
    for (s of await Shift.find({fri: true})){
        if(req.body.fri_start <= s.start && req.body.form.fri_end >= s.end){
            fri.push(s);
        };
    };
    for (s of await Shift.find({sat: true})){
        if(req.body.sat_start <= s.start && req.body.form.sat_end >= s.end){
            sat.push(s);
        };
    };
    for (s of await Shift.find({sun: true})){
        if(req.body.sun_start <= s.start && req.body.form.sun_end >= s.end){
            sun.push(s);
        };
    };
    let ava = new Avail({
        mon_start: req.body.form.mon_start,
        mon_end: req.body.form.mon_end,
        mon: mon,
        tue_start: req.body.form.tue_start,
        tue_end: req.body.form.tue_end,
        tue: tue,
        wed_start: req.body.form.wed_start,
        wed_end: req.body.form.wed_end,
        wed: wed,
        thu_start: req.body.form.thu_start,
        thu_end: req.body.form.thu_end,
        thu: thu,
        fri_start: req.body.form.fri_start,
        fri_end: req.body.form.fri_end,
        fri: fri,
        sat_start: req.body.form.sat_start,
        sat_end: req.body.form.sat_end,
        sat: sat,
        sun_start: req.body.form.sun_start,
        sun_end: req.body.form.sun_end,
        sun: sun
    });
    await ava.save();
    let user = await User.findOne({username: req.body.username})
    let person = new Person({
        name: req.body.form.name,
        hours: req.body.form.hours,
        role: req.body.form.role,
        user_id: user._id,
        availability: ava._id
    });
    try {
        person.save();
        res.status(201).json(person);

    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

module.exports = router;