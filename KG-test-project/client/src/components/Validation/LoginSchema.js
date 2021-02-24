import * as Yup from "yup";

const REQUIRED_MSG = 'This field id required!';

export const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .required(REQUIRED_MSG)
        .email('Invalid email'),
    password: Yup.string()
        .required(REQUIRED_MSG)
        .trim()
        .min(6, 'Password is too short. Should be 6 chars minimum!')
});