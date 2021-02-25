const { validationResult } = require("express-validator");
const config = require("config");
const jwt = require("jsonwebtoken");
const UserService = require("../../services/UserService");
const UserError = require("../../errors/UserError");

exports.register = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400)
                .json({
                    errors: errors.array(),
                    message: 'Wrong data while register'
                });
        }

        const data = await UserService.createUser(req.body);

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
            .json({message: 'Some errors while registering, try again'});
    }
};

exports.login = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400)
                .json({
                    errors: errors.array(),
                    message: 'Wrong data while login'
                });
        }

        const data = await UserService.loginUser(req.body);
        console.log(data);

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
            .json({message: 'Some errors while login, try again'});
    }
};

exports.verify = (req, res) => {
    const token = req.body.token.split(" ")[1];

    try {
        jwt.verify(token, config.get('jwtSecret'), async (err, decoded) => {
            if (err) {
                res.json({
                    success: false,
                    message: "Token is incorrect!"
                });
            } else {
                const dataNew = await UserService.getByEmail(decoded.email);

                res.json({
                    success: true,
                    dataNew,
                });
            }
        });
    } catch (e) {
        res.status(500)
            .json({message: e.message});
    }
};