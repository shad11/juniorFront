import React from "react";
import { useDispatch } from "react-redux";
import { trackerOperations } from "../../store/tracker";

const AddForm = () => {
    const dispatch = useDispatch();

    const addTracker = (e) => {
        e.preventDefault();
        dispatch(trackerOperations.addTracker({id: Date.now(), name: 'Test', period: 0, active: true}));
    };

    return (<>
        <input type='text' name='tracking' />
        <button type='submit' onClick={addTracker}>add</button>
    </>);
};

export default AddForm;