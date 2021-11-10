const mongoose = require('mongoose');

const AvaiSchema = mongoose.Schema({
        mon_start: Number,
        mon_end: Number,
        mon: [mongoose.Types.ObjectId],
        tue_start: Number,
        tue_end: Number,
        tue: [mongoose.Types.ObjectId],
        wed_start: Number,
        wed_end: Number,
        wed: [mongoose.Types.ObjectId],
        thu_start: Number,
        thu_end: Number,
        thu: [mongoose.Types.ObjectId],
        fri_start: Number,
        fri_end: Number,
        fri: [mongoose.Types.ObjectId],
        sat_start: Number,
        sat_end: Number,
        sat: [mongoose.Types.ObjectId],
        sun_start: Number,
        sun_end: Number,
        sun: [mongoose.Types.ObjectId]
});

module.exports = mongoose.model('Avail', AvaiSchema);