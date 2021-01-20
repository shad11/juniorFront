import React from "react";
import { connect } from "react-redux";
import { Form, withFormik } from "formik";
import { TextInput, Select } from "./Inputs";
import { OrderSchema } from "./ValidationSchemas";
import Button from "../Button";
import { makeOrder } from "../../store/products/operations";
import "./OrderForm.scss";

const cities = [
    {value: 'Kyiv', name: 'Kyiv'},
    {value: 'Kharkiv', name: 'Kharkiv'},
    {value: 'Odesa', name: 'Odesa'},
    {value: 'Dnipro', name: 'Dnipro'},
    {value: 'Zaporizhzhia', name: 'Zaporizhzhia'},
    {value: 'Lviv', name: 'Lviv'}
];

const OrderForm = (props) => (
    <Form className="order-form" noValidate>
        <TextInput label="Name" name="name" type="text" />
        <TextInput label="Surname" name="surname" type="text" />
        <TextInput label="Email" name="email" type="email" />
        <TextInput label="Age" name="age" type="number" min="16" max="120" />
        <Select label="City" name="city">
            {cities.map(city => <option key={city.value} value={city.value}>{city.name}</option>)}
        </Select>
        <TextInput label="Address" name="address" type="text" />
        <TextInput label="Phone" name="phone" type="text" placeholder="+## ### ### #### | ### ### #### | ##########"/>

        <Button text="Checkout" type="submit" disabled={props.isSubmitting} className="order-form__btn"/>
    </Form>
);

const mapDispatchToProps = (dispatch) => ({
    makeOrder: data => dispatch(makeOrder(data))
});

export default connect(null, mapDispatchToProps)
(
    withFormik({
        mapPropsToValues: () => ({
            name: '',
            surname: '',
            email: '',
            age: 16,
            city: 'Kyiv',
            address: '',
            phone: ''
        }),
        validationSchema: OrderSchema,
        handleSubmit: async (values, { setSubmitting, resetForm, props}) => {
            await props.makeOrder({data: values});
            //const result = await props.makeOrder({data: values});

            // if (result) {
            //     resetForm({values: ''});
            // }

            //setSubmitting(false);
        }
    })
    (OrderForm)
);