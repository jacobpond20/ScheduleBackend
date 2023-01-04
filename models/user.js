const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: String,
    password: String,
    admin: Boolean
});

module.exports = mongoose.model('User', UserSchema);