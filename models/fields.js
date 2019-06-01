const mongoose = require('mongoose')

const fields = new mongoose.Schema({
    name: String,
    parentId: String,
    rowId: String,
})

module.exports = mongoose.model('fields', fields, 'fields')
