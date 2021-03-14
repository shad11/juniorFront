import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { trackerOperations } from "../../store/tracker";
import "./AddForm.scss";
import PLAY_CIRCLE from "../../assets/play_circle_green.svg";

const AddForm = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, getValues, reset } = useForm();

    const addTracker = () => {
        const { name: nameVal } = getValues();
        const name = nameVal && !!nameVal.trim()
            ? nameVal.trim()
            : `Tracker ${Date.now()}`;

        dispatch(trackerOperations.addTracker({
            id: Date.now(),
            name,
            period: 0,
            active: true
        }));

        reset({});
    };

    const onKeyUp = (event) => {
        if (event.charCode === 13) {
            addTracker();
        }
    };

    return (
        <form className='add-form' onSubmit={handleSubmit(addTracker)}>
            <input className='add-form__input' type='text'
                   placeholder='Enter tracker name'
                   name='name'
                   ref={register}
                   onKeyUp={onKeyUp}
            />
            <button type='submit' className='add-form__btn'><img src={PLAY_CIRCLE} alt='' /></button>
        </form>
    );
};

export default AddForm;