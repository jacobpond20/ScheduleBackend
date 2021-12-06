const mongoose = require('mongoose');

const DayShiftSchema = mongoose.Schema({
    person: mongoose.Types.ObjectId,
    shift: mongoose.Types.ObjectId,
    day: String,
    week: mongoose.Types.ObjectId
});

module.exports = mongoose.model('DayShift', DayShiftSchema);