const fieldActions = require('../actions/fields/fieldsActions')

exports.getFields = (req, res) => {
    fieldActions.getFields()
        .then(data => res.send(data))
        .catch(err => res.send({success: false, message: err.message || err}))
}

exports.addFields = (req, res) => {
    const {name, parentId, rowId} = {...req.body, ...req.params}
    fieldActions.addFields({name, parentId, rowId})
        .then(data => res.send(data))
        .catch(err => res.send({success: false, message: err.message || err}))
}

exports.editFields = (req, res) => {
    const {name, parentId, rowId} = {...req.body, ...req.params}
    fieldActions.editField({name, parentId, rowId})
        .then(data => res.send(data))
        .catch(err => res.send({success: false, message: err.message || err}))
}

exports.deleteField = (req, res) => {
    const {id, name} = {...req.body, ...req.params}
    console.log({...req.body})
    console.log({...req.params})
    fieldActions.deleteField({name})
        .then(data => res.send(data))
        .catch(err => res.send({success: false, message: err.message || err}))
}

exports.addOneField = (req, res) => {
    const {name, rowId} = {...req.body, ...req.params}
    fieldActions.addOneField({name, rowId})
        .then(data => res.send(data))
        .catch(err => res.send({success: false, message: err.message || err}))
}