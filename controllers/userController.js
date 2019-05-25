const userActions = require('../actions/user/userActions')

exports.login = (req, res) => {
    const {username, password} = {...req.body}
    
    userActions.login(username, password)
        .then(data => res.send(data))
        .catch(err => res.send({
            success: false,
            message: err.message || err,
        }))
}

exports.verify = (req, res) => {
    const {currentUser} = {...req.body}
    userActions.verify(currentUser)
        .then(data => res.send({
            success: true,
            data,
        }))
        .catch(err => res.send({
            success: false,
            message: err.message || err,
        }))
}

exports.changePassword = (req, res) => {
    const {username, password, oldPassword, currentUser} = {...req.body}

    userActions.changePassword({username, password, oldPassword, currentUser})
        .then(data => res.send({
            success: true,
            data,
        }))
        .catch(err => res.send({
            success: false,
            message: err.message || err
        }))
}

exports.addUser = (req, res) => {
    const {number, name, username, password, type, email, degree, department} = {...req.body}
    userActions.addUser({number, name, username, password, type, email, degree, department})
        .then(data => res.send(data))
        .catch(err => res.send({
            success: false,
            message: err.message || err,
        }))
}

exports.deleteUser = (req, res) => {
    const {id} = {...req.params, ...req.body}
    userActions.deleteUser(id)
        .then(data => res.send(data))
        .catch(err => res.send({
            success: false,
            message: err.message || err,
        }))
}

exports.getAllUsers = (req, res) => {
    userActions.getAllUsers()
        .then(data => res.send(data))
        .catch(e => res.send({success: false, message: e.message || e}))
}

exports.editUser = (req, res) => {
    // console.log(req)
    const {id ,number, name, username, password, type, email, degree, department} = {...req.body}
    // console.log({id ,number, name, username, password, type, email, degree, department})
    userActions.editUser({id ,number, name, username, password, type, email, degree, department})
        .then(data => res.send(data))
        .catch(e => res.send({success: false, message: e.message || e}))
}
