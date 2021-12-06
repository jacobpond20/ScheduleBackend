const mongoose = require('mongoose');

const HoursSchema = mongoose.Schema({
    week: mongoose.Schema.Types.ObjectId,
    person: mongoose.Schema.Types.ObjectId,
    hours: Number
});

module.exports = mongoose.model('Hours', HoursSchema);