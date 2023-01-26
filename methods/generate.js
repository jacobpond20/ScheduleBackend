//const Day = require('../models/day');
const DayShift = require('../models/dayShift.js');
const Shift = require('../models/shift');
const Person = require('../models/person');
const Avail = require('../models/availability');
const Hours = require('../models/hours.js');
const Mongoose = require('mongoose');

class generator{
/*
    constructor(){
    };
*/
    async genDay(day, week){
        let scheduled = [];
        let shiftQuery = {};
        shiftQuery[day] = true;
        let shifts = await Shift.find(shiftQuery);

        //Loop through all shifts for current day
        for(const s of shifts){ 
            let done = false;
            var availQuery = {};
            availQuery[day] = s._id;
            let unscheduled = await Avail.find(availQuery);

            //Remove any avails that have already been scheduled for this day
            for(let i = 0; i < scheduled.length; i++){
                for(let j = 0; j < unscheduled.length; j++){
                    if(Mongoose.Types.ObjectId(scheduled[i]._id).equals(Mongoose.Types.ObjectId(unscheduled[j]._id))){
                        unscheduled.splice(j, 1);
                    }
                }
            }
            
            do{
                if(unscheduled.length == 0){
                    break;
                }                
                let index = Math.floor(Math.random() * unscheduled.length);
                /*
                let a = await Avail.aggregate([                         
                    {$match : query2},
                    {$sample: {size: 1}}
                ]);

                console.log()
                
                if(a == undefined){
                    return 'Undefined';
                }
                */
                let p = await Person.findOne({availability: unscheduled[index]._id});
                let ph = await Hours.findOne({person: p._id, week: week._id})
                if(ph.hours - s.hours >= 0){
                    ph.hours = ph.hours - s.hours;
                    ph.save();
                    let d = new DayShift({
                        person: p._id,
                        shift: s._id,
                        day: day,
                        week: week._id
                    });
                    d.save();
                    scheduled.push(unscheduled[index]);
                    done = true;
                }else{
                    unscheduled.splice(index, 1);
                }
            }while(done == false);
        };
        return 0;
    };

};

module.exports = {generator};