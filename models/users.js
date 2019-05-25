const mongoose = require('mongoose')

const users = new mongoose.Schema({
    number: String,
    name: String,
    username: String,
    password: String,
    email: String,
    type: String,
    email: String,
    department: String,
})

module.exports = mongoose.model('users', users, 'users')
