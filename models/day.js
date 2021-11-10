const mongoose = require('mongoose');

const DaySchema = mongoose.Schema({
    name:String,
    people: [mongoose.Schema.Types.ObjectId]    
});

module.exports = mongoose.model('Day', DaySchema);