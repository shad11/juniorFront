import React, {useEffect} from "react";
import { Formik, Form } from "formik";
import {useDispatch, useSelector} from "react-redux";
import { Redirect } from "react-router-dom";
import { useMessage } from "../../hooks/message.hook";
import { TextInput } from "../Common/Inputs";
import { RegisterSchema } from "../Validation";
import Button from "../Button";
import { userOperations, userSelectors } from "../../store/user";

const initialValues = {
    login: '',
    email: '',
    password: ''
};

const RegisterForm = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(userSelectors.isAuth);
    const error = useSelector(userSelectors.getError);
    const message = useMessage();

    useEffect(() => {
        error && message(error.message);
    }, [error]);

    const handleSubmit = async (values) => {
        await dispatch(userOperations.register(values));
    };

    return (<>
        {isAuth && <Redirect to='/' />}

        <Formik
            initialValues={initialValues}
            validationSchema={RegisterSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form autoComplete='off'>
                    <TextInput name='login' type='text' label='Login' />
                    <TextInput name='email' type='text' label='Email' />
                    <TextInput name='password' type='password' label='Password' />

                    <Button className="btn waves-effect waves-light"
                            type="submit"
                            disabled={isSubmitting}
                    >
                        Register
                    </Button>
                </Form>
            )}
        </Formik>
    </>)
};

export default RegisterForm;