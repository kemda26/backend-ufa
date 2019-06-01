const {Teachers, Users} = require('../../models')


exports.getOneTeacher = async (id) => {
    let data = new Promise(resolve => {
        Teachers.findOne({
            _id: id.toString()
        }, function(err, res) {
            resolve(res)
        })
    })
    return data
}

exports.editProfile = async (data) => {
    const {id} = data
    const teacher = await Teachers.findOne({
        _id: id.toString()
    })
    if (!teacher) throw new Error('Teacher not found')
    await teacher.delete()
    const newTeacher = new Teachers({_id:id, ...data})
    return await newTeacher.save()
}

exports.addField = async (data) => {
    const {id, field} = data
    const teacher = await Teachers.findOne({
        _id: id.toString()
    })
    if (!teacher) throw new Error('Teacher not found')
    const {name, email, phone, address, website, degree, avatar, department, description} = teacher
    console.log(teacher)
    await teacher.delete()
    const newTeacher = new Teachers({_id: id, name, email, phone, address, website, degree, avatar, department, description, field: field})
    console.log(newTeacher)
    return await newTeacher.save()
}

exports.getTeachers = async () => {
    let data = new Promise(resolve => {
        Teachers.find({}, function(err, res) {
            resolve(res)
        })
    })
    return data
}

exports.editTeacher = async (data) => {
    const {} = data
    const teacher = await Teachers.findOne({
        _id: id
    }).select('_id')
    if (!teacher) throw new Error('Teacher not found')
    for (let key in teacherDetails) teacher[key] = teacherDetails[key]
    //add teacher id to field
    const field = await Fields.findOne({
        _id: args.field
    }).select('_id')
    if (!field) throw new Error('Field not found')
    field.teacher.append(id)
    return await teacher.save()
}

exports.deleteTeacher = async (id) => {
    const teacher = await Teachers.findOne({
        _id: id
    }).select('_id')
    if (!teacher) throw new Error('Teacher not found')
    return await teacher.delete()
}

