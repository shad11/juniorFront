import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useMessage } from "../../hooks/message.hook";
import { TextInput, RadioButton } from "../Common/Inputs";
import { EmployeeSchema } from "../Validation";
import Button from "../Button";
import { userSelectors } from "../../store/user";
import { staffSelectors, staffOperations, staffActions } from "../../store/staff";
import { URL_STAFF } from "../../constants/url";

const mainInitialValues = {
    fullName: '',
    sex: '',
    phone: '',
    salary: '',
    position: ''
};

const sex = [
    { value: 'male', name: 'Male' },
    { value: 'female', name: 'Female' }
]

const EmployeeForm = () => {
    const token = useSelector(userSelectors.getToken);
    const employeeSelected = useSelector(staffSelectors.getSelected);
    const dispatch = useDispatch();
    const message = useMessage();

    const initialValues = !employeeSelected ? mainInitialValues : employeeSelected;

    useEffect(() => {
        if (employeeSelected) {
            window.M && window.M.updateTextFields();
        }

        return () => dispatch(staffActions.selectEmployee(null));
    }, []);

    const handleSubmit = (values, { resetForm, setSubmitting, setStatus }) => {
        if (!employeeSelected) {
            axios.post(`${URL_STAFF}`, values, {
                headers: { "Authorization": token }
            })
                .then( ({ data }) => {
                    dispatch(staffOperations.addEmployee(data));

                    message(`Employee ${data.fullName} has been created!`)
                    setStatus({ success: true });
                    resetForm({});
                })
                .catch(({ response }) => message(response.data.message))
                .finally(() => setSubmitting(false));
        } else {
            axios.put(`${URL_STAFF}`, values, {
                headers: { "Authorization": token }
            })
                .then( ({ data }) => {
                    dispatch(staffOperations.editEmployee(data));

                    message(`Employee ${data.fullName} has been edited!`)
                    setStatus({ success: true });
                })
                .catch(({ response }) => message(response.data.message))
                .finally(() => setSubmitting(false));
        }
    };

    return (<>
        <Formik
            initialValues={initialValues}
            validationSchema={EmployeeSchema}
            onSubmit={handleSubmit}
            on
        >
            {({ isSubmitting }) => (
                <Form>
                    <TextInput name='fullName' type='text' label='Full Name' />
                    <TextInput name='phone' type='text' label='Phone' />
                    <TextInput name='salary' type='number' label='Salary' min='100' max='50000'/>
                    <RadioButton name='sex' label='Sex' options={sex} />
                    <TextInput name='position' type='text' label='Position' />

                    <Button className="btn waves-effect waves-light"
                            type="submit"
                            disabled={isSubmitting}
                    >
                        {!employeeSelected ? 'Add' : 'Edit'}
                    </Button>
                </Form>
            )}
        </Formik>
    </>)
};

export default EmployeeForm;