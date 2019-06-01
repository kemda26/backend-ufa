const teacherActions = require('../actions/teachers/teacherActions')

exports.getTeachers = (req, res) => {
    teacherActions.getTeachers()
        .then(data => res.send(data))
        .catch(err => res.send({ success: false, message: err.message || err }))
}

exports.editProfile = (req, res) => {
    const {id, name, email, phone, address, website, degree, avatar, department, description, field } = { ...req.body, ...req.params }

    teacherActions.editProfile({ id, name, email, phone, address, website, degree, avatar, department, description, field })
        .then(data => res.send(data))
        .catch(err => res.send({ success: false, message: err.message || err }))
}

exports.addField = (req, res) => {
    const {id , field} = {...req.body, ...req.params}
    console.log(field)
    teacherActions.addField({id, field})
        .then(data => res.send(data))
        .catch(err => res.send({ success: false, message: err.message || err }))
}

exports.deleteTeacher = (req, res) => {
    const { id } = { ...req.params }

    teacherActions.editTeacher(id )
        .then(teacher => res.send( teacher))
        .catch(err => res.send({ success: false, message: err.message || err }))
}





exports.getOneTeacher = (req, res) => {
    const {id} = {...req.body, ...req.params}
    
    teacherActions.getOneTeacher(id)
        .then(data => res.send(data))
        .catch(e => res.send({ success: false, message: e.message || e }))
}