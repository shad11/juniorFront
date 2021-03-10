import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { trackerOperations } from "../../store/tracker";

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
        <form onSubmit={handleSubmit(addTracker)}>
            <input type='text' name='name' ref={register} onKeyUp={onKeyUp} />
            <button type='submit'>add</button>
        </form>
    );
};

export default AddForm;