const mongoose = require('mongoose')

const users = new mongoose.Schema({
    // number: String,
    // name: String,
    username: String,
    password: String,
    type: String,
    // email: String,
    // email: String,
    // department: String,
    // degree: String,
    profile: {type: mongoose.Types.ObjectId, ref: 'teachers'}
})

module.exports = mongoose.model('users', users, 'users')
