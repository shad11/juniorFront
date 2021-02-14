import * as Yup from "yup";

const REQUIRED_MSG = 'Поле обязательно для заполнения';

// todo: check this reg
const eMailRegExp=/^(|(([A-Za-z0-9]+_+)|([A-Za-z0-9]+-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6})$/i;

export default Yup.object().shape({
    email: Yup
        .string()
        .trim()
        .required(REQUIRED_MSG)
        .matches(eMailRegExp, 'E-mail error!'),
    password: Yup
        .string()
        .trim()
        .min(8, 'min 8 symbol')
        .required(REQUIRED_MSG),

});