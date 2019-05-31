const mongoose = require('mongoose')

const fields = new mongoose.Schema({
    title: String,
    value: String,
    key: String,
    children: Array,
})

module.exports = mongoose.model('fields', fields, 'fields')
