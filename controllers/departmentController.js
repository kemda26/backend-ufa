const departmentActions = require('../actions/departments/departmentActions')

exports.getAllDepartments = (req, res) => {
    departmentActions.getAllDepartments()
        .then(data => res.send(data))
        .catch(e => res.send({success: false, message: e.message || e}))
}

exports.getDepartments = (req, res) => {
    const {limit, page, name} = {...req.query, ...req.body}
    departmentActions.getDepartments({limit, page, name})
        .then(data => res.send({
            success: true,
            data,
        }))
        .catch(err => res.send({success: false, message: err.message || err}))
}

exports.addDepartment = (req, res) => {
    const {name, type, address, phone, website} = {...req.body}
    departmentActions.addDepartment({name, type, address, phone, website})
        .then(department => res.send(department))
        .catch(err => res.send({success: false, message: err.message || err}))
}

exports.editDepartment = (req, res) => {
    const {id, name, type, address, phone, website} = {...req.body, ...req.params}
    departmentActions.editDepartment({id, name, type, address, phone, website})
        .then(department => res.send(department))
        .catch(err => res.send({success: false, message: err.message || err}))
}

exports.deleteDepartment = (req, res) => {
    const {id} = {...req.body ,...req.params}
    departmentActions.deleteDepartment(id)
        .then(department => res.send( department))
        .catch(err => res.send({success: false, message: err.message || err}))
}
