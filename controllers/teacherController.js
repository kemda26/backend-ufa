const teacherActions = require('../actions/teachers/teacherActions')
const { verifyHeaders } = require('../helpers/bcrypt')

exports.getTeachers = (req, res) => {
    teacherActions.getTeachers()
        .then(data => res.send(data))
        .catch(err => res.send({ success: false, message: err.message || err }))
}

exports.addTeacher = (req, res) => {
    const { name, username, email, phone, address, website, degree, department, avatar, description ,field } = { ...req.body }

    teacherActions.addTeacher({ name, username, email, phone,  address, website, degree, department, avatar, description, field})
        .then(data => res.send({ success: true, data }))
        .catch(err => res.send({ success: false, message: err.message || err }))
}

exports.editProfile = (req, res) => {
    const {id, name, email, phone, address, website, degree, avatar, department, description, field } = { ...req.body, ...req.params }

    teacherActions.editProfile({ id, name, email, phone, address, website, degree, avatar, department, description, field })
        .then(data => res.send(data))
        .catch(err => res.send({ success: false, message: err.message || err }))
}

exports.deleteTeacher = (req, res) => {
    const { id } = { ...req.params }

    teacherActions.editTeacher(id )
        .then(teacher => res.send( teacher))
        .catch(err => res.send({ success: false, message: err.message || err }))
}

exports.uploadAvatar = (req, res) => {
    const { file, id } = { ...req, ...req.params }

    teacherActions.uploadAvatar(file, id)
        .then(avatar => res.send({ success: true, avatar }))
        .catch(err => res.send({ success: false, message: err.message || err }))
}

const teacherFieldsActions = require('../actions/teachers/teacherFieldsActions')

exports.addTeacherToFields = (req, res) => {
    const { id, fields } = { ...req.params, ...req.body }

    teacherFieldsActions.addTeacherToFields({ teacherId: id, fields })
        .then(teacher => res.send({ success: true, teacher }))
        .catch(err => res.send({ success: false, message: err.message || err }))
}

exports.removeTeacherFromFields = (req, res) => {
    const { id, fields } = { ...req.params, ...req.body }

    teacherFieldsActions.removeTeacherFromFields({ teacherId: id, fields })
        .then(teacher => res.send({ success: true, teacher }))
        .catch(err => res.send({ success: false, message: err.message || err }))
}

exports.getOneTeacher = (req, res) => {
    const {id} = {...req.body, ...req.params}
    
    teacherActions.getOneTeacher(id)
        .then(data => res.send(data))
        .catch(e => res.send({ success: false, message: e.message || e }))
}