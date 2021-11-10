const express = require('express');
const person = require('../models/person');
const router = express.Router();
const Shift = require('../models/shift');
const Avail = require('../models/availability');

router.get('/', (req, res) => {
    res.status(204).send();
});

router.post('/', async (req,res) => {
    let shift = new Shift({
        name: req.body.name,
        role: req.body.role,
        start: req.body.start,
        end: req.body.end,
        hours: req.body.hours,
        mon: req.body.mon,
        tue: req.body.tue,
        wed: req.body.wed,
        thu: req.body.thu,
        fri: req.body.fri,
        sat: req.body.sat,
        sun: req.body.sun
    });
    try{
        shift.save();
        let people = await person.find();
        for(p of people){

            let availability = await Avail.findOne({_id: p.availability});
            if(req.body.mon == true){
                if(availability.mon_start <= req.body.start && availability.mon_end >= req.body.end){
                    await Avail.updateOne({_id: p.availability}, {$addToSet: {mon: shift._id}});                                                   //update() is working but updateOne() isn't
                };
            };
            if(req.body.tue == true){
                if(availability.tue_start <= req.body.start && availability.tue_end >= req.body.end){
                    await Avail.updateOne({_id: p.availability}, {$addToSet: {tue: shift._id}});
                };
            };
            if(req.body.wed == true){
                if(availability.wed_start <= req.body.start && availability.wed_end >= req.body.end){
                    await Avail.updateOne({_id: p.availability}, {$addToSet: {wed: shift._id}});
                };
            };
            if(req.body.thu == true){
                if(availability.thu_start <= req.body.start && availability.thu_end >= req.body.end){
                    await Avail.updateOne({_id: p.availability}, {$addToSet: {thu: shift._id}});
                };
            };
            if(req.body.fri == true){
                if(availability.fri_start <= req.body.start && availability.fri_end >= req.body.end){
                    await Avail.updateOne({_id: p.availability}, {$addToSet: {fri: shift._id}});
                };
            };
            if(req.body.sat == true){
                if(availability.sat_start <= req.body.start && availability.sat_end >= req.body.end){
                    await Avail.updateOne({_id: p.availability}, {$addToSet: {sat: shift._id}});
                };
            };
            if(req.body.sun == true){
                if(availability.sun_start <= req.body.start && availability.sun_end >= req.body.end){
                    await Avail.updateOne({_id: p.availability}, {$addToSet: {sun: shift._id}});
                };
            };
            p.save();
        };
        res.status(201).json(shift);
    } catch (err) {
        res.send(err);
    }
});
module.exports = router;