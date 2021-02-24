const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const UserError = require("../errors/UserError");
const UserModel = require("../models/User");

const createResponseData = (user) => {
    const token = jwt.sign(
        { userId: user._id, email: user.email },
        config.get('jwtSecret'),
        { expiresIn: '1h'}
    );

    return {
        user: {
            ...user.toObject(),
            __v: undefined,
            password: undefined,
        },
        token: `Bearer ${token}`,
    };
};

exports.createUser = async ({ login, email, password }) => {
    const user = await UserModel
        .findOne({ email })
        .exec();

    if (user) {
        return new UserError(400, 'Such user already exists!');
    }

    const hashedPass = await bcrypt.hash(password, 15);

    const userNew = await UserModel.create({
        login,
        email,
        password: hashedPass
    });

    return createResponseData(userNew);
};

exports.loginUser = async ({ email, password }) => {
    const user = await UserModel
        .findOne({ email })
        .exec();

    if (!user) {
        return new UserError(400, 'No such user!');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return new UserError(400, 'Wrong password!');
    }

    return createResponseData(user);
};

exports.getByEmail = async (email) => {
    const user = await UserModel
        .findOne({ email })
        .exec();

    return createResponseData(user);
};