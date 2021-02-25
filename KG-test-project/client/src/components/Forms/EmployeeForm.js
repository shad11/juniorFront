import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useMessage } from "../../hooks/message.hook";
import { TextInput, RadioButton } from "../Common/Inputs";
import { EmployeeSchema } from "../Validation";
import Button from "../Button";
import { staffSelectors, staffOperations, staffActions } from "../../store/staff";

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
    const dispatch = useDispatch();
    const message = useMessage();
    const employeeSelected = useSelector(staffSelectors.getSelected);
    const error = useSelector(staffSelectors.getError);
    const success = useSelector(staffSelectors.getSuccess);

    useEffect(() => {
        error && message(error.message);
    }, [error]);

    useEffect(() => {
        success && message(success.message);
    }, [success]);

    const initialValues = !employeeSelected ? mainInitialValues : employeeSelected;

    useEffect(() => {
        if (employeeSelected) {
            window.M && window.M.updateTextFields();
        }

        return () => {
            dispatch(staffActions.selectEmployee(null));
            dispatch(staffActions.setError(null));
            dispatch(staffActions.setSuccess(null));
        }
    }, []);

    const handleSubmit = async (values, { resetForm }) => {
        values.fullName.trim();

        if (!employeeSelected) {
            await dispatch(staffOperations.addEmployee(values));
            resetForm({});
        } else {
            await dispatch(staffOperations.editEmployee(values));
        }
    };

    return (<>
        <Formik
            initialValues={initialValues}
            validationSchema={EmployeeSchema}
            onSubmit={handleSubmit}
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