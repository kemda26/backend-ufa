const mongoose = require('mongoose')

const teacher = new mongoose.Schema({
    // user: {type: mongoose.Types.ObjectId, ref: 'users'},
    name: String,
    email: String,
    phone: String,
    address: String,
    department: String,
    website: String,
    degree: String,
    avatar: String,
    description: String,
})

module.exports = mongoose.model('teachers', teacher)
