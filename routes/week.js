const express = require('express');
const Generate = require('../methods/generate');
const router = express.Router();
const Person = require('../models/person');
const Week = require('../models/week');
const Hours = require('../models/hours.js');
const DayShift = require('../models/dayShift');
const Shift = require('../models/shift');
const Mongoose = require('mongoose');

router.get('/all', async (req, res) => {
    let weeks = await Week.find();
    if(weeks.length == 0){
        res.status(202).json({message: "No weeks found"});
        return;
    }
    let current = await Week.findOne({startDate: {$lte: Date.now()}, endDate: {$gte: Date.now()}});
    if(current == null){
        current = await Week.findOne({startDate: {$gte: Date.now()}});
        res.status(200).json({weeks: weeks, currentWeek: current, message: "Current"})
    }else{
        res.status(200).json({weeks: weeks, currentWeek: current, message: "Current"});
    }
});

router.get('/current', async (req, res) => {
    let week = await Week.findOne({startDate: {$lte: Date.now()}, endDate: {$gte: Date.now()}});
    if(week == null){
        res.status(202).json({message: "No schedule has been generated for current week"});
        return;
    }
    res.status(200).json(week);
});

router.post('/generate', async (req, res) => {
    if(await Week.findOne({name: req.body.scheduleName}) != null){
        res.status(406).send("That week already exists in database.");
    }else{
        const generator = new Generate.generator();
        let week = new Week({name: req.body.scheduleName, startDate: req.body.startDate, endDate: req.body.endDate});
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
            await generator.genDay(a, week);    
        }
        res.json(week);
    }    
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
    let rawID = req.body.weekID;
    let id = Mongoose.Types.ObjectId(req.body.weekID);
    if(id == null){
        res.status(202).json({message: "Issue finding week with provided id: " + id});
        return;
    }
    let week = await Week.findOne({_id: id});
    await DayShift.deleteMany({week: week._id});
    await Hours.deleteMany({week: week._id});
    await Week.deleteOne({_id: week._id});
    res.status(200);
});

module.exports = router;