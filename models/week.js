const mongoose = require('mongoose');

const WeekSchema = mongoose.Schema({
    name: String
    /*,
    mon: mongoose.Schema.Types.ObjectId,
    tue: mongoose.Schema.Types.ObjectId,
    wed: mongoose.Schema.Types.ObjectId,
    thu: mongoose.Schema.Types.ObjectId,
    fri: mongoose.Schema.Types.ObjectId,
    sat: mongoose.Schema.Types.ObjectId,
    sun: mongoose.Schema.Types.ObjectId,
    */
});

module.exports = mongoose.model('Week', WeekSchema);