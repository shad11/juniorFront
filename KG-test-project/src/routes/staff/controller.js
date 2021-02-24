const { validationResult } = require("express-validator");
const StaffService = require("../../services/StaffService");
const UserError = require("../../errors/UserError");

exports.create = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400)
                .json({
                    errors: errors.array(),
                    message: 'Wrong data while creating Employee'
                });
        }

        const data = await StaffService.createEmployee(req.body, Number(req.user.userId));

        if (data instanceof UserError) {
            return res.status(data.code)
                .json({
                    message: data.message
                })
        }

        res.status(201)
            .json(data);
    } catch (e) {
        res.status(500)
            .json({message: 'Some errors while creating employee, try again'});
    }
};

exports.edit = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400)
                .json({
                    errors: errors.array(),
                    message: 'Wrong data while editing Employee'
                });
        }

        const data = await StaffService.editEmployee(req.body);

        if (data instanceof UserError) {
            return res.status(data.code)
                .json({
                    message: data.message
                })
        }

        res.status(201)
            .json(data);
    } catch (e) {
        res.status(500)
            .json({message: 'Some errors while editing employee, try again'});
    }
};

exports.delete = async (req, res) => {
    try {
        await StaffService.deleteEmployee(req.body);

        res.status(201)
            .json({
                success: true
            });
    } catch (e) {
        res.status(500)
            .json({message: 'Some errors while deleting employee, try again'});
    }
};

exports.getAll = async (req, res) => {
    try {
        const data = await StaffService.getAll();

        res.status(201)
            .json(data);
    } catch (e) {
        res.status(500)
            .json({message: 'Some errors while getting employees, try again'});
    }
};