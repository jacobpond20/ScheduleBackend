const express = require('express');
const Generate = require('../methods/generate');
const router = express.Router();
const Person = require('../models/person');
const Week = require('../models/week');
const Hours = require('../models/hours.js');
const DayShift = require('../models/dayShift');
const Shift = require('../models/shift');

router.post('/generate', async (req, res) => {
    if(await Week.findOne({name: req.body.name}) != null){
        res.status(406).send("That week already exists in database.");
    }
    const generator = new Generate.generator();
    let week = new Week({name: req.body.name});
    week.save();
    for(const p of await Person.find()){
        let h = new Hours({
            week: week._id,
            person: p._id,
            hours: p.hours
        });
        h.save();
    };
    let array = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
    for(const a of array){
        await generator.genDay(a, week)
        .then((result) => {
            if(result == 'error1'){
                res.status(406).send("Nobody available for shift on monday.");
            }
        });    
    }
    res.json(week);
});


router.post('/redo', async (req, res) => {          //recieves week{} json object, days[] array listing days to change
    let week = await Week.findOne({name: req.body.name});
    let days = req.body.days.split(',');
    console.log(days);
    for(const d of days){
        console.log(d);
        let dayshifts = await DayShift.find({day: d, week: week._id});
        for(const ds of dayshifts){
            console.log(ds.day);
            let p = await Person.findOne({_id: ds.person});
            let h = await Hours.findOne({person: p._id});
            let s = await Shift.findOne({_id: ds.shift});
            h.hours = h.hours + s.hours;
            await h.save();
            await ds.delete();
        }
    };
    const generator = new Generate.generator();
    for(const d of days){           //loop through array again so that all hours are fully reset for the week before beginning to generate new dayshifts.
        await generator.genDay(d, week)
        .then((result) => {
            if(result == 'error1'){
                res.status(406).send("Nobody available for shift on monday.");
            }
        });    
    };
    res.status(201).json(week);
});

router.post('/delete', async (req, res) => {
    let week = await Week.findOne({name: req.body.name});
    for(const d of await DayShift.find({week: week._id})){
        d.delete();
    }
    for(const h of await Hours.find({week: week._id})){
        h.delete();
    }
    week.delete();
    res.status(200).send("Week deleted.");
});

module.exports = router;