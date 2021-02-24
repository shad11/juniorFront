import * as Yup from "yup";

const REQUIRED_MSG = 'This field id required!';

export const EmployeeSchema = Yup.object().shape({
    fullName: Yup.string()
        .required(REQUIRED_MSG)
        .min(6, 'The minimum length should be 6 symbols'),
    phone: Yup.string()
        .required(REQUIRED_MSG)
        .matches(/(\+\d{1,2}\s)?\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\3([0-9]{4})/g,
            {message: 'Invalid mobile format (+## ### ### #### | ### #### ##### | ##########)', excludeEmptyString: false}),
    salary: Yup.number()
        .required(REQUIRED_MSG)
        .min(100, 'Should be minimum 100')
        .max(50000, 'Should be max 50000'),
    sex: Yup.string()
        .required(REQUIRED_MSG)
        .oneOf(['male', 'female']),
    position: Yup.string()
        .required(REQUIRED_MSG)
});