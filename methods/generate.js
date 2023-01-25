//const Day = require('../models/day');
const DayShift = require('../models/dayShift.js');
const Shift = require('../models/shift');
const Person = require('../models/person');
const Avail = require('../models/availability');
const Hours = require('../models/hours.js');

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
        for(const s of shifts){
            let done = false;
            var availQuery = {};
            availQuery[day] = s._id;
            let unscheduled = await Avail.find(availQuery);
            for(let i = 0; i < scheduled.length; i++){
                if(unscheduled.find(element => element._id == scheduled[i]) != undefined){
                    unscheduled.splice(unscheduled.findIndex(scheduled[i]), 1);
                }
            }
            let counter = 0;
            do{                
                console.log(counter);
                if(counter > 10){
                    done = true;
                    continue;
                }
                counter++;
                
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
                
                let cont = false;                                              //if set to true, same person has been selected for multiple shifts in a single day
                for(const sch of scheduled){
//                    console.log('p_id: ' + p._id + ' v: ' + v);
                    if(sch.equals(p._id)){
                        console.log("Same person two days, should continue now. Day: " + day);
                        cont = true;                                        //Continue through outer do/while loop to find new person, because person selected has already been scheduled for this day.
                        continue;
                    }
                }
                if(cont == true){continue;}                                //continue to refresh person
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
                    scheduled.push(p._id);
                    done = true;
                };
            }while(done == false);
        };
        return 0;
    };

};

module.exports = {generator};