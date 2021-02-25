const EmployeeModel = require("../models/Employee");
const UserError = require("../errors/UserError");

exports.createEmployee = async (data, userId) => {
    const employee = await EmployeeModel
        .findOne({ fullName:
                { $regex: new RegExp("^" + data.fullName + "$", "i") }})
        .exec();

    if (employee) {
        return new UserError(400, 'Such employee already exists!');
    }
    const newEmployee = await EmployeeModel.create({
        creator: userId,
        ...data,
    });

    return {
        ...newEmployee.toObject(),
        __v: undefined
    };
};

exports.editEmployee = async (data) => {
    const checkEmployee = await EmployeeModel
        .findOne({ fullName:
            { $regex: new RegExp("^" + data.fullName, "i") }})
        .exec();

    if (checkEmployee._id !== data._id) {
        return new UserError(400, 'Such Full Name has another employee!');
    }

    const employee = await EmployeeModel
        .findByIdAndUpdate(data._id, data, { new: true });

    if (!employee) {
        return new UserError(400, 'No such employee!');
    }

    return {
        ...employee.toObject(),
        __v: undefined
    };
};

exports.deleteEmployee = async ({ id }) => {
    return await EmployeeModel
        .findByIdAndDelete(id)
        .exec();
}

exports.getAll = async () => {
    return await EmployeeModel
        .find({})
        .sort({ _id: 'desc' })
        // .populate({
        //     path: 'creator',
        //     select: ['_id', 'email']
        // })
        .select('-__v')
        .exec();
}