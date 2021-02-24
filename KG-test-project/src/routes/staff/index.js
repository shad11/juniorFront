const { Router } = require("express");
const { check } = require("express-validator");
const staffController = require("./controller");

const router = Router();

router.get('/', staffController.getAll);

router.post('/',
    [
        check('fullName', 'FullName should be min 6 symbols').isLength({ min: 6 }),
        check('sex', 'Wrong sex value!').isIn(['male', 'female']),
        check('phone', 'Min phone length 10 symbols').isLength({ min: 10 }),
        check('salary', 'Salary min 100$ and max 50000$').isFloat({ min: 100, max: 50000})
    ],
    staffController.create
);

router.put('/',
    [
        check('fullName', 'FullName should be min 6 symbols').isLength({ min: 6 }),
        check('sex', 'Wrong sex value!').isIn(['male', 'female']),
        check('phone', 'Min phone length 10 symbols').isLength({ min: 10 }),
        check('salary', 'Salary min 100$ and max 50000$').isFloat({ min: 100, max: 50000})
    ],
    staffController.edit
);

router.delete('/', staffController.delete);

module.exports = router;