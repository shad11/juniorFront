const { Router } = require("express");
const { check } = require("express-validator");
const authController = require("./controller");

const router = Router();

router.post('/register',
    [
        check('login', 'Login should be min 4 symbols').isLength({ min: 4 }),
        check('email', 'Wrong email format!').isEmail(),
        check('password', 'Min password length 6 symbols').isLength({ min: 6 })
    ],
    authController.register
);

router.post('/login',
    [
        check('email', 'Enter correct email!').isEmail(),
        check('password', 'Min password length 6 symbols').isLength({ min: 6 })
    ],
    authController.login
);

router.post('/verify', authController.verify);

module.exports = router;