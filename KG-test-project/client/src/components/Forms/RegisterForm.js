import React from "react";
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
    const message = useMessage();

    const handleSubmit = (values, { resetForm, setSubmitting }) => {
        dispatch(userOperations.register(values))
            .then(() => resetForm({}))
            .catch(({ response }) => message(response.data.message))
            .finally(() => setSubmitting(false));
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