const { Users, Tokens } = require('../../models')
const { createHash, compareHash, signJwt } = require('../../helpers/bcrypt')
const { removeRedundant, isString } = require('../../helpers/validators/typeValidators')

exports.login = async (username, password) => {
    const user = await Users.findOne({
        username,
    }).select('_id username password type')

    if (!user) throw new Error('User not found')
    // console.log(user.password)
    if (password != user.password) throw new Error('Wrong password')

    return {
        username,
        type: user.type,
        token: signJwt({ username, type: user.type})
    }
}

exports.verify = async (currentUser) => {
    return currentUser
}

exports.changePassword = async ({ username, password, oldPassword, currentUser }) => {
    let user = await Users.findOne({ username })
    let newPassword = createHash(password);
    if (!user) throw new Error('User not found')
    if (user.password && user.status === 'active') {
        if (compareHash(oldPassword, user.password)) {
            user.password = newPassword
            await user.save()
        } else {
            throw new Error('Wrong password')
        }
    } else {
        if (currentUser.username !== username) throw new Error('Wrong token')
        user.password = newPassword
        user.status = 'active'
        await user.save()
    }

    const value = createHash(String(new Date().getTime()))
    const newToken = new Tokens({ user: user._id, value })
    await Tokens.deleteMany({ user: user._id })
    await newToken.save()

    return {
        username,
        type: user.type,
        token: signJwt({ username, type: user.type, value })
    }
}

const _validateArgs = (username, password, type) => {
    const validUsername = isString(username)
    const validPassword = isString(password)
    const validType = isString(type)
    console.log('username: ' + validUsername + ' password: ' + validPassword + ' type: ' + validType)
    return removeRedundant({ username: validUsername, password: validPassword, type: validType })
}

exports.addUser = async (newUser) => {
    // const hash = createHash(password)
    // const validatedArgs = _validateArgs(username, hash, type)
    const user = new Users(newUser)
    return await user.save()
}

exports.deleteUser = async (id) => {
    const user = await Users
        .findOne({
            _id: id
    })
    if (!user) throw new Error('User not found')
    return await user.delete()
}

exports.editUser = async (newData) => {
    let {id, ...rest} = newData
    const user = await Users
        .findOne({
            _id : id
        })
    if (!user) throw new Error('User not found')
    else await user.delete()
    let newUser = new Users({_id: id.toString() , ...rest})
    return await newUser.save()
}

exports.getAllUsers = async () => {
    let data = new Promise(resolve => {
        Users.find({}, function(err, res) {
            resolve(res)
        })
    })
    return data
}