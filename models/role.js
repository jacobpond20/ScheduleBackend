const mongoose = require('mongoose');

const RoleSchema = mongoose.Schema({
    role: String,
    admin: Boolean
});

module.exports = mongoose.model('Role', RoleSchema);