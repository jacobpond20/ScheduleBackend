const mongoose = require('mongoose');
const user = require('./user');

const PersonSchema = mongoose.Schema({
    name: String,
    hours: Number,
    user: user.User
});

module.exports = mongoose.model('Person', PersonSchema);