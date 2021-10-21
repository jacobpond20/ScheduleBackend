const mongoose = require('mongoose');

const PersonSchema = mongoose.Schema({
    name: String,
    hours: Number,
    role: String,
    user_id: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Person', PersonSchema);