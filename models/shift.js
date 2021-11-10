const mongoose = require('mongoose');

const ShiftSchema = mongoose.Schema({
    name: String,
    role: String,
    start: Number,
    end: Number,
    hours: Number,
    mon: Boolean,
    tue: Boolean,
    wed: Boolean,
    thu: Boolean,
    fri: Boolean,
    sat: Boolean,
    sun: Boolean
});

module.exports = mongoose.model("Shift", ShiftSchema);