const express = require('express');
const Generate = require('../methods/generate');
const router = express.Router();
const Person = require('../models/person');
const Day = require('../models/day');
const Week = require('../models/week');

router.get('/generate', (req, res) => {
    res.status(204).send();
});

router.post('/generate', async (req, res) => {
    const generator = new Generate.generator(await Person.find());
    let week = new Week({name: req.body.name});
    await generator.genDay("mon", req.body.date)
    .then( (result) =>{
        if(result == 'error1'){
            console.log('Nobody available for shift on monday');
        }else{
            week.mon = result;
        }
    });
    await generator.genDay("tue", req.body.date)
    .then( (result) =>{
        if(result == 'error1'){
            console.log('Nobody available for shift on tuesday');
        }else{
            week.tue = result;
        }
    });
    await generator.genDay("wed", req.body.date)
    .then( (result) =>{
        if(result == 'error1'){
            console.log('Nobody available for shift on wed');
        }else{
            week.wed = result;
        }
    });
    await generator.genDay("thu", req.body.date)
    .then( (result) =>{
        if(result == 'error1'){
            console.log('Nobody available for shift on thu');
        }else{
            week.thu = result;
        }
    });
    await generator.genDay("fri", req.body.date)
    .then( (result) =>{
        if(result == 'error1'){
            console.log('Nobody available for shift on fri');
        }else{
            week.fri = result;
        }
    });
    await generator.genDay("sat", req.body.date)
    .then( (result) =>{
        if(result == 'error1'){
            console.log('Nobody available for shift on sat');
        }else{
            week.sat = result;
        }
    });
    await generator.genDay("sun", req.body.date)
    .then( (result) =>{
        if(result == 'error1'){
            console.log('Nobody available for shift on sun');
        }else{
            week.sun = result;
        }
    });
    week.save();
    console.log(week);
    res.json(week);
});

router.post('/delete', async (req, res) => {
    let week = await Week.findOne({name: req.body.name});
    (await Day.findOne({_id: week.mon})).delete();
    (await Day.findOne({_id: week.tue})).delete();
    (await Day.findOne({_id: week.wed})).delete();
    (await Day.findOne({_id: week.thu})).delete();
    (await Day.findOne({_id: week.fri})).delete();
    (await Day.findOne({_id: week.sat})).delete();
    (await Day.findOne({_id: week.sun})).delete();
    week.delete();
    res.status(200).send("Week deleted.");
});

module.exports = router;