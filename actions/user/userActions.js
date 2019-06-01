const { Users, Tokens, Teachers } = require('../../models')
const { createHash, compareHash, signJwt } = require('../../helpers/bcrypt')
const { removeRedundant, isString } = require('../../helpers/validators/typeValidators')
const moongse = require('mongoose')

exports.login = async (username, password) => {
    const user = await Users.findOne({
        username,
    }).select('_id username password type profile')

    if (!user) throw new Error('Tài khoản không tồn tại')
    // console.log(user.password)
    if (password != user.password) throw new Error('Sai mật khẩu')
    // console.log({
    //     id: user._id.toString(),
    //     username,
    //     type: user.type,
    //     token: signJwt({ username, type: user.type}),
    //     profile: user.profile.toString(),
    // })
    return {
        id: user._id.toString(),
        username,
        type: user.type,
        token: signJwt({ username, type: user.type}),
        profile: user.profile.toString(),
    }
}

exports.verify = async (currentUser) => {
    return currentUser
}

// 5ce8fe311c9d440000f74698
// 5cead7a41c9d440000dc467e

exports.changePassword = async (newData) => {
    const {id, currentPassword, newPassword} = newData
    const user = await Users.findOne({
        _id: id,
    })
    const {_id, username, profile, type} = user
    if (user.password != currentPassword) throw new Error('Mật khẩu hiện tại không chính xác')
    console.log(user)
    const newUser = new Users({_id, username, profile, type, password: newPassword})
    console.log(newUser)
    await user.delete()
    return await newUser.save()
}


exports.addUser = async (newUser) => {
    const id = moongse.Types.ObjectId()
    const {name, email, phone, username, password, type} = newUser
    const user = new Users({username, password, type, profile: id.toString()})
    const teacher = new Teachers({_id: id.toString(), name, email, phone})
    await teacher.save()
    return await user.save()
}

exports.deleteUser = async (id) => {
    const user = await Users.findOne({
            _id: id
    })
    const teacher = await Teachers.findOne({
        _id: user.profile.toString()
    })
    if (!user) throw new Error('User not found')
    await teacher.delete()
    return await user.delete()
}

exports.editUser = async (newData) => {
    let {id, name, email, phone, username, password, type} = newData
    const user = await Users.findOne({
            _id : id
        })
    const teacher = await Teachers.findOne({
        _id: user.profile.toString()
    })
    if (!user) throw new Error('User not found')
    else {
        await user.delete()
        await teacher.delete()
    }
    let newTeacher = new Teachers({_id: user.profile.toString(), ...teacher, name, email, phone})
    newTeacher.save()
    let newUser = new Users({_id: id.toString() , username, password, type, profile: user.profile.toString()})
    return await newUser.save()
}

exports.getAllUsers = async () => {
    let data = new Promise(resolve => {
        Users.find({})
            .populate('profile')
            .exec(function(err, res) {
                resolve(res)
            })
    })
    return data
}