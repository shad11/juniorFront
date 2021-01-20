import * as yup from "yup";

const REQUIRED_MSG = 'This field is required';

export const OrderSchema = yup.object().shape({
    name: yup.string()
        .required(REQUIRED_MSG)
        .min(2, 'The minimum length should be 2 symbols')
        .matches(/^[A-Za-zа-яА-ЯЁё]+$/, {message: 'Please input alphabet characters only'}),
    surname: yup.string()
        .required(REQUIRED_MSG)
        .min(2, 'The minimum length should be 2 symbols')
        .matches(/^[A-Za-zа-яА-ЯЁё]+$/, {message: 'Please input alphabet characters only'}),
    email: yup.string()
        .required(REQUIRED_MSG)
        .email('Invalid email'),
    age: yup.number()
        .required(REQUIRED_MSG)
        .min(16, 'Minimal age should be 16')
        .max(120, 'Max age is 120'),
    address: yup.string()
        .required(REQUIRED_MSG)
        .min(10, 'The minimum length should be 10 symbols'),
    phone: yup.string()
        .required(REQUIRED_MSG)
        .matches(/(\+\d{1,2}\s)?\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\3([0-9]{4})/g,
            {message: 'Invalid mobile format (+## ### ### #### | ### #### ##### | ##########)', excludeEmptyString: false})
});