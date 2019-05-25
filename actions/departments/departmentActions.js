const {Departments} = require('../../models')


// exports.getDepartments = async ({limit, page, name}) => {
    //     const validatedArgs = _validateArgs({limit, page, name})
    //     const query = {
        //         name: {
            //             $regex: new RegExp(`${validatedArgs.name.toLowerCase()}`, 'i')
            //         }
            //     }
            //     const skip = validatedArgs.limit * (validatedArgs.page - 1)
            
            //     const departmentQuery = Departments
            //         .find(query)
            //         .skip(skip)
            //         .limit(validatedArgs.limit)
            //         .lean()
            //     const totalQuery = Departments.countDocuments({})
            //     const [departments, total] = await Promise.all([departmentQuery, totalQuery])
            
            //     return {
                //         page: validatedArgs.page,
                //         departments,
                //         total,
                //     }
                
                // }

exports.getAllDepartments = async () => {
    let data = new Promise(resolve => {
        Departments.find({}, function(err, res) {
            resolve(res)
        })
    })
    return data
}

exports.editDepartment = async (data) => {
    let {id, ...rest} = data
    const department = await Departments
        .findOne({
            _id: id
        })
    if(!department) throw new Error('Department not found')
    else await department.delete()
    let newData = new Departments({_id: id.toString(), ...rest})
    return await newData.save()
}

exports.addDepartment = async (data) => {
    const department = new Departments(data)
    return await department.save()
}


exports.deleteDepartment = async (id) => {
    const department = await Departments
        .findOne({
            _id: id
        })
    if(!department) throw new Error('Department not found')
    return await department.delete()
}
