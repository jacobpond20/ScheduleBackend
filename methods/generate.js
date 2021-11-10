const User = require('../models/user');
const Day = require('../models/day');
const Week = require('../models/week');
const Shift = require('../models/shift');
const Person = require('../models/person');
const Avail = require('../models/availability');
const db = require('mongodb').Db;

class generator{

    constructor(people){
        this.pHours = [];
        for(let p of people){
            this.pHours.push({
                "name": p.name,
                "hours": p.hours
            });
        };
    };

    async genDay(day, date){
        console.log(day);
        let value = [];
        let query1 = {};
        query1[day] = true;
        let shifts = await Shift.find(query1);
        for(const s of shifts){
            let done = false;
            var query2 = {};
            query2[day] = s._id;
            let counter = 0;
            do{
                counter++;
                
                let a = await Avail.aggregate([                          
                    {$match : query2},
                    {$sample: {size: 1}}
                ]);
                let p = await Person.findOne({availability: a[0]._id});
                let cont = false;                                              //if set to true, same person has been selected for multiple shifts in a single day
                for(const v of value){
                    console.log('p_id: ' + p._id + ' v: ' + v);
                    if(v.equals(p._id)){
                        console.log("Same person two days, should continue now. Day: " + day);
                        cont = true;                                          //Continue through outer do/while loop to find new person, because person selected has already been scheduled for this day.
                        continue;
                    }
                }
                if(cont == true){continue;};                                  //continue to refresh person
                let num = 0;
                for(let i = 0; i < this.pHours.length; i++){
                    if(this.pHours[i]['name'] == p.name){
                        num = i;
                    };
                };
                if(this.pHours[num]['hours'] - s.hours >= 0){
                    this.pHours[num]['hours'] = this.pHours[num]['hours'] - s.hours;
                    value.push(p._id);
                    done = true;
                };
                if(counter > 10){
                    return 'error1'
                }
            }while(done == false);
        };
        let d = new Day({
            name: day + " - " + date,
            people: value
        });
        d.save();
        return d;
    };

};

module.exports = {generator};