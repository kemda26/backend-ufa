const {Fields} = require('../../models')


exports.getFields = async () => {
    const data = new Promise( resolve => {
        Fields.find({}, function(err, res) {
            resolve(res)
        })
    })
    return data
}

exports.addOneField = async (data) => {
    const {name, rowId} = data
    const field = new Fields({name, rowId})
    return await field.save()
}   

exports.addFields = async (data) => {
    const {name, parentId, rowId} = data
    const field = new Fields({name, parentId, rowId})
    return await field.save()
}

exports.editField = async (data) => {
    const {id, name, parentId, rowId} = data
    const field = await Fields.findOne({
        _id: id
    })
    if(!field) throw new Error('Field not found')
    const newField = new Fields({name, parentId, rowId})
    await field.delete()
    
    return await newField.save()
}

exports.deleteField = async (data) => {
    console.log(data)
    const {id, name} = data
    // console.log(name)
    const field = await Fields.findOne({
        _id: id.toString()
    })
    if(!field) throw new Error('Field not found')
    return await field.delete()
}
